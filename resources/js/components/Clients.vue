<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 admin-card">
        <div class="card admin-card-header">
            <h4>Клиенты</h4>
            <div class="card-body row">
                <div id="accordion2" class="col-md-8">
                    <div class="building-header">
                        <div class="card-header" id="uheading1">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#ucollapse1"
                                        aria-expanded="true" aria-controls="ucollapse1">
                                    Пользователь №1
                                </button>
                            </h5>
                        </div>

                        <div id="ucollapse1" class="collapse show" aria-labelledby="uheading1"
                             data-parent="#accordion2">
                            <div class="card-body building-body">
                                <ul>
                                    <li><span><b>Номер договора: </b></span><span>Test</span></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <form action="" class="admin-form">
                        <div class="form-group"><input name="cl-name" type="text" class="form-control"
                                                       placeholder="ФИО"></div>
                        <div class="form-group"><select class="form-control" name="" id="group-select2">
                            <option value="">Родительский элемент</option>
                        </select>
                        </div>
                        <div class="form-group"><input name="cl-cid" type="text" class="form-control"
                                                       placeholder="Должность"></div>
                        <div class="form-row form-group">
                            <div class="col"><select id="country" class="form-control">
                                <option value="ru"><img src="">Саранск +7 (8342)</option>
                                <option value="ua">Рузаевка +7 (83451)</option>
                                <option value="by">Ковылкино +7 (83453)</option>
                            </select>
                            </div>
                            <div class="col">
                                <input id="phone" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"><input name="cl-info" type="text" class="form-control"
                                                       placeholder="Внутренний номер" maxlength="4"></div>

                        <div class="form-row form-group">
                            <div class="col"><select class=" custom-select" name="building" id="building">
                            </select></div>
                            <div class="col"><input name="cl-info" type="text" class="form-control"
                                                    placeholder="кабинет/этаж"></div>
                            <div class="col"><select class="form-control" name="" id="">
                                <option value="1">кабинет</option>
                                <option value="2">этаж</option>
                            </select></div>
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
                clients: [],
                client: {
                    id: '',
                    fio: '',
                    parent: '',
                    number: '',
                    internal_number: '',
                    cab_number: '',
                    place_type: ''

                }
            }
        },

        created() {
            this.fetchCLients();
        },

        methods: {
            fetchCLients() {
                fetch("/api/clients")
                    .then(res => res.json())
                    .then(res => {
                        this.clients = res;
                        console.log(res);
                    })
            },

            addGroup() {
                fetch('/api/client/add', {
                    method: 'post',
                    body: JSON.stringify(this.group),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.client.fio = "";
                        this.client.type = "";
                        this.client.name = "";
                        this.fetchGroups();
                    })
                    .catch(err => console.log(err))
            }
        }

    }
</script>

