<template>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 admin-card">
        <div class="card admin-card-header">
            <h4>Здания</h4>
            <div class="card-body row">
                <div id="accordion1" class="col-md-6">
                    <div v-for="building in buildings" v-bind:key="building.id">
                        <div class="building-header">
                            <div class="card-header" id="heading2">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse1"
                                            aria-expanded="true" aria-controls="collapse1">
                                        {{ building.name }}
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse1" class="collapse" aria-labelledby="heading1"
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
                    <form action="" class="admin-form">
                        <div class="form-group"><input name="obj-name" type="text" class="form-control"
                                                       placeholder="Название" v-model="building.name"></div>
                        <div class="form-group"><input name="obj-type" type="text" class="form-control"
                                                       placeholder="Тип" v-model="building.type"></div>
                        <div class="form-group"><input name="obj-address" type="text" class="form-control"
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
                fetch("buildings.json")
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.buildings = res;
                    })
            },

            addBulding() {
                fetch('buildings.json', {
                    method: 'POST',
                    body: JSON.stringify(this.building),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.fetchBuildings();
                    })
                    .catch(err => console.log(err))
            }
        }

    }
</script>
