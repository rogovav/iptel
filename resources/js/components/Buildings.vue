<template>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 admin-card">
        <div class="card admin-card-header">
            <h4>Здания</h4>
            <div class="card-body row">
                <div id="accordion1" class="col-md-6">
                    <div v-for="building in buildings" v-bind:key="building.id">
                        <div class="building-header">
                            <div class="card-header" v-bind:id="'heading'+building.id">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            v-bind:data-target="'#collapse'+building.id"
                                            aria-expanded="false" v-bind:aria-controls="'collapse'+building.id">
                                        {{ building.name }}
                                    </button>
                                </h5>
                            </div>
                            <div v-bind:id="'collapse'+building.id" class="collapse"
                                 v-bind:aria-labelledby="'heading'+building.id"
                                 data-parent="#accordion1">
                                <div class="card-body building-body">
                                    <ul>
                                        <li><span><b>Тип: </b></span>{{ building.name }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <form action="" class="admin-form" @submit.prevent="addBulding">
                        <div class="form-group"><input type="text" class="form-control"
                                                       placeholder="Название" v-model="building.name"></div>
                        <div class="form-group"><select class="form-control" name="" id="" v-model="building.type">
                            <option value="1" selected>Общеж</option>
                        </select></div>
                        <div class="form-group"><input type="text" class="form-control"
                                                       placeholder="Адрес" v-model="building.address"></div>
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
                buildings: [],
                building: {
                    id: '',
                    name: '',
                    type: '',
                    address: ''
                }
            }
        },

        created() {
            this.fetchBuildings();
        },

        methods: {
            fetchBuildings() {
                fetch("/api/buildings")
                    .then(res => res.json())
                    .then(res => {
                        this.buildings = res;
                    })
            },

            addBulding() {
                fetch('/api/building/add', {
                    method: 'post',
                    body: JSON.stringify(this.building),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.building.address = "";
                        this.building.type = "";
                        this.building.name = "";
                        this.fetchBuildings();
                    })
                    .catch(err => console.log(err))
            }
        }

    }
</script>
