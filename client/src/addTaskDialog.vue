<template>
    <v-card style='padding: 0px 0px 15px 0px'>
        <!--panel header-->
            <v-card-title
                v-if="!updating"
                class='headline primary justify-center'
                primary-title style='color: white' >
                <font-awesome-icon icon="fa-solid fa-circle-plus" style= "margin: 3px"/> Add Task
            </v-card-title>

            <v-card-title
                v-else
                class='headline primary justify-center'
                primary-title style='color: white' >
                <font-awesome-icon icon="fa-solid fa-pen-to-square" style= "margin: 3px"/> Edit Task
            </v-card-title>

        <!--panel body-->
        <v-form ref="form">
            <v-simple-table style='margin: 20px 20px 0px 20px'>
                <tr>
                    <td colspan="2">
                        <v-text-field v-model="title"
                            :readonly="updating"
                            style='margin: 10px'
                            outlined
                            label="Title"
                            :rules="[
                                        value => !!value || 'Required.',
                                        value => !!this.isUnique || 'Title is not unique!'
                                    ]"
                            hide-details="auto"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <v-text-field v-model="description"
                            style='margin: 10px'
                            outlined
                            label="Description"
                            :rules="required"
                            hide-details="auto"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td  colspan="2">
                        <v-text-field v-model="deadline"
                            type = "date"
                            style='margin: 10px'
                            outlined
                            label="Deadline"
                            :rules="required"
                            hide-details="auto"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <v-radio-group :rules = "required" v-model="priority" row>
                            <v-radio
                                v-for= "prio in ['Low', 'Med', 'High']"
                                :label= "`${prio}`"
                                :value= "prio"
                            ></v-radio>
                        </v-radio-group>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center; width:50%;">
                        <v-btn v-if="!updating" class='primary' @click="addEntry(title)" style="width:100%;">
                            <font-awesome-icon icon="fa-solid fa-circle-plus" style= "margin: 3px"/> ADD
                        </v-btn>
                        <v-btn v-else class='primary' @click="editEntry()" style="width:100%;">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" style= "margin: 3px"/> EDIT
                        </v-btn>
                    </td>
                    <td style="text-align:center; width:50%;">
                        <v-btn class='error' @click="cancel" style="width:100%;">
                            <font-awesome-icon icon="fa-solid fa-ban" style= "margin: 3px"/> CANCEL
                        </v-btn>
                    </td>
                </tr>
            </v-simple-table>
        </v-form>
    </v-card>
</template>

    
<script>
    import moment from 'moment'

    export default {
        name: 'addTaskDialog',
    //life cycles
        created(){},
    //methods
        methods: {
            cancel(){
                this.$refs.form.reset();
                this.$emit('closeDialog');
                console.log(this.titles);
            },
            addEntry(currentTitle){
                this.isUnique = !this.titles.some((v)=> v == currentTitle);
                if (this.$refs.form.validate()){
                    let payload = {
                        title: this.title,
                        description: this.description,
                        deadline: moment(this.deadline).format("MM/DD/YYYY"),
                        priority: this.priority,
                        completed: false,
                    };
                    this.$emit('addEntry', payload);
                    this.$refs.form.reset();
                    this.$emit('closeDialog');
                    console.log("valid")
                }
                else{
                    console.log("invalid")
                }
            },
            editEntry(){
                let payload = {
                    description: this.description,
                    deadline: moment(this.deadline).format("MM/DD/YYYY"),
                    priority: this.priority,
                    completed: false,
                };
                this.$emit('editEntry', payload);
                this.$refs.form.reset();
                this.$emit('closeDialog');
            }
        }, 
    //watchers
        watch: {
            currentTitle(newTitle, oldTitle){
                this.title = newTitle;
                console.log('u tit');
            },
            currentDescription(newDescription, oldDescription){
                this.description = newDescription;
                console.log('u des');
            },
            currentDeadline(newDeadline, oldDeadline){
                this.deadline = newDeadline;
                console.log('u dead');
            },
            currentPriority(newPriority, oldPriority){
                this.priority = newPriority;
                console.log('u prio');
            }
        },
    //computed
        computed: {},
    //global vars
        data: global => ({
            title: '',
            isUnique: true,
            description: {},
            deadline: {},
            priority: {},
            required: [
                value => !!value || "Required."
            ],
        }),
        props:{
            updating:false,
            titles:{},
            entry:{},
            currentTitle:null,
            currentDescription:null,
            currentDeadline:{},
            currentPriority:{}
        },
    }
</script>