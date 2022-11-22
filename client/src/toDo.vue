<template>
    <v-app style='margin:30px'>

        <v-card height="100%">
        <!--panel header-->
            <v-card-title
                class='headline primary justify-center'
                primary-title style='color: white' >
                <font-awesome-icon icon="fa-solid fa-bars" style= "margin: 5px"/> FRAMWORKS

                

                <v-dialog persistent v-model="dialog1" width="400px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class='primary' @click="() => updating = false" v-bind="attrs" v-on="on" color="blue" dark>
                            <font-awesome-icon icon="fa-solid fa-circle-plus" style= "margin: 2px" /> ADD
                        </v-btn>
                    </template>
                    <addTaskDialog :titles="titles" 
                                    :updating="updating" 
                                    :currentTitle = "currentTitle"
                                    :currentDescription = "currentDescription"
                                    :currentDeadline = "currentDeadline"
                                    :currentPriority = "currentPriority"
                                    @addEntry="addEntry($event)" 
                                    @editEntry="editEntry(entry, $event)" 
                                    @closeDialog="closeDialog($event)"/>
                </v-dialog>
            </v-card-title>

        <!--panel body-->
            <v-simple-table style='margin: 20px;'>
                <template v-slot:default>
                <!--table header-->
                    <thead>
                    <tr>
                        <th v-for = "header in headers" class="text-center">
                            {{header}}
                        </th>
                    </tr>
                    </thead>
                <!--table body-->
                    <tbody>
                        <tr v-for = "entry in entries">
                            <td  style="text-align: center"> {{entry.title}} </td>
                            <td  style="text-align: center"> {{entry.description}} </td>
                            <td  style="text-align: center"> {{entry.deadline}} </td>
                            <td  style="text-align: center"> {{entry.priority}} </td>
                            <td  style="text-align: center"> <v-checkbox v-model="entry.completed"/> </td>
                            <td  style="text-align: center"> 
                                <div>
                                    <tr>
                                        <v-dialog persistent v-model="dialog2" width="400px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn v-if="!entry.completed" @click="updateThisEntry(entry)" class='primary' v-bind="attrs" v-on="on" style="width:100%;">
                                                    <font-awesome-icon icon="fa-solid fa-pen-to-square" style= "margin: 3px"/> EDIT
                                                </v-btn>
                                            </template>
                                            <addTaskDialog 
                                                :titles="titles" 
                                                :updating="updating" 
                                                :currentTitle = "currentTitle"
                                                :currentDescription = "currentDescription"
                                                :currentDeadline = "currentDeadline"
                                                :currentPriority = "currentPriority"
                                                @addEntry="addEntry($event)" 
                                                @editEntry="editEntry(entry, $event)" 
                                                @closeDialog="closeDialog($event)"/>
                                        </v-dialog>
                                        
                                    </tr>
                                    <tr>
                                        <v-btn class='error' @click="()=> {entries = entries.filter((e)=>e!==entry);}" style="width:100%;">
                                            <font-awesome-icon icon="fa-solid fa-x" style= "margin: 3px"/> DELETE
                                        </v-btn>
                                    </tr>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </v-app>
</template>

<script>
import addTaskDialog from './addTaskDialog.vue';

//master
    export default {
        components: {
            addTaskDialog,
        },
    //life cycles
        created(){},
    //methods
        methods: {
            addEntry(payload){
                console.log(payload)
                this.entries.push(payload)
            },
            editEntry(entry, payload){
                entry.description = payload.description
                entry.deadline = payload.deadline
                entry.priority = payload.priority
            },
            closeDialog(){
                this.dialog1 = false;
                this.dialog2 = false;
            },
            updateThisEntry(entry){
                this.updating = true;
                this.currentTitle = entry.title;
                this.currentDescription = entry.description;
                this.currentDeadline = entry.deadline;
                this.currentPriority = entry.priority;
            }
        }, 
    //watchers
        watch: {},
    //computed
        computed: {
            titles(){
                console.log(this.entries.map((e)=>e.title))
                return this.entries.map((e)=>e.title);
            }
        },
    //global vars
          data: global => ({
            headers: ["Title", "Description", "Deadline", "Priority", "Completed", "Action"],
            entries: [],
            dialog1: false,
            dialog2: false,
            updating: false,
            thisEntry:{},
            currentTitle: null,
            currentDescription: null,
            currentDeadline: {},
            currentPriority: {}
        }),
    }
</script>