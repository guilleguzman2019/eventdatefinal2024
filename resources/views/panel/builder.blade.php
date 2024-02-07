<?php
    $componentesJson = $componentes->map(function ($componente) {
        return [
            'id' => $componente->id,
            'nombre' => $componente->nombre,
            'label' => $componente->label,
            'html'   => $componente ->html,
            'style'   => $componente ->style,
            'script'   => $componente ->script,
            'tipo' => $componente->template->name,
            'ComponentHijo' => $componente->hijo,
        ];
    })->toJson();

    $invitacionId = $invitacion -> id ;

    $data = $invitacion -> data ;

    $assets = $invitacion -> assets ;


?>

<script>
    var component = {!! $componentesJson !!};

    console.log(component);

    var invitacionId = {!! $invitacionId !!};

    var token = '{{ csrf_token() }}';

    var jsondata = {!! $data !!};

    var jsonassets = {!! $assets !!};

    console.log(jsonassets);

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@1,500&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
    <script src="https://unpkg.com/grapesjs"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown"></script>
    <script src="https://unpkg.com/grapesjs-blocks-basic"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css"/>

    <link rel="stylesheet" href="/css/builder.css">

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

</head>
<body>

    <div id="navbar" class="sidenav d-flex flex-column overflow scroll">

        <nav class="navbar navbar-light">
          <div class="container-fluid" style="padding: 15px;">
            <a href="/">
              <img src="https://eventdate.es/wp-content/uploads/2022/10/LOGO-EVENTDATE-BLANCO.png" alt="" width="160"  style="margin: 0 auto;">
            </a>
          </div>
        </nav>

        <div class="my-2 d-flex flex-column">
        </div>
        <div class="">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#block"
                  type="button"
                  role="tab"
                  aria-controls="block"
                  aria-selected="true"
                >
                  <i class="bi bi-grid-fill"></i>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="trait-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#layer"
                  type="button"
                  role="tab"
                  aria-controls="layer"
                  aria-selected="false"
                >
                  <i class="bi bi-layers-fill"></i>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="style-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#style"
                  type="button"
                  role="tab"
                  aria-controls="style"
                  aria-selected="false"
                >
                  <i class="bi bi-palette-fill"></i>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="style-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#trait"
                  type="button"
                  role="tab"
                  aria-controls="trait"
                  aria-selected="false"
                >
                  <i class="bi bi-gear"></i>
                </button>
              </li>
            </ul>
            <div class="tab-content" style="font-size: 12px;">
              <div
                class="tab-pane fade show active"
                id="block"
                role="tabpanel"
                aria-labelledby="block-tab"
              >
                <div id="blocks"></div>
              </div>

              <div
                class="tab-pane fade"
                id="layer"
                role="tabpanel"
                aria-labelledby="layer-tab"
              >
                <div id="layers-container"></div>
              </div>

              <div
                class="tab-pane fade"
                id="style"
                role="tabpanel"
                aria-labelledby="style-tab"
              >
                <div id="style-container"></div>
              </div>

              <div
                class="tab-pane fade"
                id="trait"
                role="tabpanel"
                aria-labelledby="trait-tab"
              >
                <div id="trait-container"></div>
              </div>

            </div>
          </div>

    </div>

    <div class="main-content">
        <nav class="navbar navbar-light p-2" style="background-color: #242e42; position: sticky;top: 0; z-index: 99999;">
          <div class="container-fluid">
            <div class="panel__devices"></div>
            <div class="panel__basic-actions"></div>
            <div style="display:flex">
                <div class="p-2">
                     <a href="{{ route('panel.invitaciones')}}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                     </a>
                </div>
                <button type="button" class="btn btn-primary" id="btnPago">
                  Compartir 🎉
                </button>
                
            </div>
          </div>
        </nav>
        <div>
          <div id="editor" class="p-3">
          </div>
        </div>
    </div>

    <!-- Modal instrucciones del component portada -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-bs-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="" alt="" width=100%>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de pago mercadopago -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-bs-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <h5 class="tituloModal2">Scannea el qr con tu aplicacion de mercadopago y paga</h5>
            <br>
            <img src="https://www.mercadopago.com/instore/merchant/qr/89984120/d079d059721c4e1b9586ed8cf5e367963d955c3337374180b835572c93fe85cb.png" alt="" width="200px">
            <br>
            <img src="https://nuvei.com/wp-content/uploads/2021/06/mercadopago.png" alt="" width="200px">

          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    
    <script>
      function miFuncion() {

        $.ajax({
            type: 'POST',
            url: '/panel/PagoMercadopago',
            dataType: 'json',
            data: {
              invitacionId : invitacionId ,
                "_token": token
            },
            success: function(response) {
                console.log(response);

                if (response.success) {
                    $('#exampleModal2').modal('show');
                } else {
                    console.error(response.message);
                }
            },
            error: function(error) {
                console.error(error);
            }
        });


      }

        

      var boton = document.getElementById('btnPago');

      // Agrega un evento de clic al botón que llama a la función
      boton.addEventListener('click', miFuncion);
    </script>
    <!--<script src="script/json.js"></script>-->
    <script src="/script/builder.js"></script>

    
</body>
</html>