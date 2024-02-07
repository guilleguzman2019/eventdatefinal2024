<?php
    $cancionesJson = $canciones->map(function ($cancion) {
        return [
            'id' => $cancion->id,
            'nombre' => $cancion->nombre,
            'autor'   => $cancion ->autor,
            'link'  => $cancion -> link,
            'Invitacion'  => $cancion -> invitacion -> titulo,
        ];
    })->toJson();

?>

@extends('layouts.dashboard')

@section('title', 'Inicio - Dashboard')

@section('navbar')
    @include('includes.navbarPanel')
@endsection

@section('content')
    @include('layouts.navigation')
    <br>

    <script>

      var token = '{{ csrf_token() }}';

    </script>

    <script>

      var data = {!! $cancionesJson !!};

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container p-0">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Musica</h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal">
                                    <i class="material-icons">&#xE147;</i> <span>Agregar Musica</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                    @verbatim
                    <!--filtros de vuejs para el html -->
                    <div class="px-2 pb-4" style="display:flex; justify-content: flex-end; align-items: center;">
                       

                       <div style="margin-right: 29px;">
                        <label style=" margin-right: 11px;">Invitacion:</label>
                        <select class="selectFilter" v-model="filtroTemplate" @change="filtrarInvitaciones" style=" width: 150px;">
                            <option value="">Todos</option>
                            <option v-for="invitacion in invitacionesUnicas" :key="invitacion" :value="invitacion">{{ invitacion }}</option>
                        </select>
                       </div>

                       <div style=" margin-left: 25px;">
                        <button @click="exportToCSV" class="btn btn-primary">Exportar a CSV</button>
                       </div>

                    </div>
                    

                    <table class="table table-responsive-sm table-striped">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Autor</th>
                              <th>Link</th>
                              <th>Invitacion</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="cancion in canciones" :key="cancion.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td>{{ cancion.nombre }}</td>
                              <td>{{ cancion.autor }}</td>
                              <td>{{ cancion.link }}</td>
                              <td>{{ cancion.Invitacion }}</td>
                              <td style="display: flex;">
                                  <a href="#editEmployeeModal" class="edit" data-toggle="modal" @click="prepararEditar()">
                                      <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                  </a>
                                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion()">
                                      <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                  </a>
                              </td>
                          </tr>
                        @endverbatim
                      </tbody>
                    </table>
                    
                </div>
            </div>

            

        </div>
    </section>

    @section('script')
      
      <script src="/script/admin.js"></script>
      <script src="/script/vueCancion.js"></script>
    @endsection

@endsection
