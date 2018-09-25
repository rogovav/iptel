<template>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 admin-card">
        <div class="card admin-card-header">
            <h4>Группы</h4>
            <div class="card-body row">
                <div id="accordion2" class="col-md-6">
                    <div v-for="group in groups" v-bind:key="group.id">
                        <div class="building-header">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed">
                                        {{ group.name }}
                                    </button>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <form action="" class="admin-form" @submit.prevent="addGroup">
                        <div class="form-group">
                            <select class="form-control" name="" id="group-select">
                                <option value="" v-model="group.parent_id">Родительский элемент</option>
                            </select>
                        </div>
                        <div class="form-group"><input name="ev-name" type="text" class="form-control"
                                                       placeholder="Название группы" v-model="group.name"></div>
                        <div class="form-group">
                            <select class="form-control" name="" id="" v-model="group.priority">
                                <option value="1">Приоритет</option>
                            </select>
                        </div>
                        <div class="form-group"><input type="submit" class="form-control"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {

            return {
                groups: [],
                group: {
                    id: '',
                    name: '',
                    value: '',
                    parent_id: '',
                    priority: ''
                }
            }
        },

        created() {
            this.fetchGroups();
        },

        methods: {
            fetchGroups() {
                fetch("/api/groups")
                    .then(res => res.json())
                    .then(res => {
                        this.groups = res;
                        console.log(res);
                    })
            },

            addGroup() {
                fetch('/api/group/add', {
                    method: 'post',
                    body: JSON.stringify(this.group),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.group.address = "";
                        this.group.type = "";
                        this.group.name = "";
                        this.fetchGroups();
                    })
                    .catch(err => console.log(err))
            }
        }

    }
</script>
