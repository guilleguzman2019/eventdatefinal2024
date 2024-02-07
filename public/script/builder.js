//configuracion del init de grapesjs

const editor = grapesjs.init({
    container: "#editor",
    storageManager: false,
    showOffsets: 1,
    allowScripts: 1,
    noticeOnUnload: 0,
    
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: {
      appendTo: "#style-container",
    },
    layerManager: {
      appendTo: "#layers-container",
    },
    traitManager: {
      appendTo: "#trait-container",
    },
    panels: {
      defaults: [
        {
          id: "basic-actions",
          el: ".panel__basic-actions",
          buttons: [
            {
              id: "visibility",
              active: true, // active by default
              className: "btn-toggle-borders",
              label: '<i class="bi bi-border"></i>',
              command: "sw-visibility", // Built-in command
            },
            {
              id: "save",
              active: true, // active by default
              className: "btn-toggle-borders",
              label: '<i class="fa fa-floppy-o"></i>',
              command: "get-proyect", // Built-in command
            },
            {
              id: "view code",
              active: true, // active by default
              className: "",
              label: '<i class="fa fa-file-code-o"></i>',
              command: "open-code", // Built-in command
            },
            {
              id: "clean canva",
              active: true, // active by default
              className: "",
              label: '<i class="fa fa-trash-o"></i>',
              command: "clean-canva", // Built-in command
            },
          ],
        },
        {
          id: "panel-devices",
          el: ".panel__devices",
          buttons: [
            {
              id: "device-desktop",
              label: '<i class="bi bi-laptop"></i>',
              command: "set-device-desktop",
              active: true,
              togglable: false,
            },
            {
              id: "device-mobile",
              label: '<i class="bi bi-phone"></i>',
              command: "set-device-mobile",
              togglable: false,
            },
          ],
        },
      ],
    },
    assetManager: {

      uploadFile: function (e) {
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var formData = new FormData();

        // Agregar archivos al objeto FormData
        for (var i in files) {
          formData.append('files[]', files[i]);
        }

        fetch('/panel/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRF-TOKEN': token
          }
        })
        .then(response => response.json())
        .then(data => {
          // Agregar el archivo cargado a la lista de activos

          console.log('imagen');
          console.log(data.data);

          editor.AssetManager.add([
            {
              src: 'http://127.0.0.1:8000/storage/uploads/'+data.data['nombre_imagen'],
              name: data.data['nombre_imagen'],
              type: 'image'
            }
          ]);

        })
        .catch(error => {
          console.error('Error al cargar el archivo:', error);
        });

        
      }

      
    },
    canvas: {
      styles: ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css',
                'https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@500&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Meow+Script&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet',
                'https://fonts.googleapis.com/css2?family=Alata&amp;display=swap',
                'https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap',
                'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&amp;display=swap',
                'https://fonts.googleapis.com/css2?family=Birthstone&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.1/assets/owl.carousel.css',
                'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                ],
      scripts: ['https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/owl.carousel.min.js'
               ]
    }
  });

  
  editor.Commands.add('set-device-desktop', {
    run: function(editor, sender) {
      
      editor.setDevice('Desktop');
      console.log('desktop');
    }
  });

  editor.Commands.add('set-device-mobile', {
    run: function(editor, sender) {
      
      editor.setDevice('Mobile portrait');
      console.log('mobile');
    }
  });

  editor.Commands.add('open-code', {
    run: function(editor, sender) {

      editor.runCommand('core:open-code')
    }
  });

  editor.Commands.add('clean-canva', {
    run: function(editor, sender) {

      editor.runCommand('core:canvas-clear')
    }
  });

  var stringGrapes = 'data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false"';


  var jsondatafinal = {};

  var lista = '';

  var contador = '';

  var idInvitacion = '';

  editor.Commands.add('get-proyect', {

    run: async function(editor, sender) {

      jsondatafinal = {};

      console.log(JSON.stringify(assets));

      var startfrom = localStorage.getItem('startfrom');
      var endTxt = localStorage.getItem('endTxt');

      assets['contador'] =  { startfrom : startfrom , endTxt : endTxt}

      var jsonObject2 = {
        id: invitacionId,
        tipo: 'assets',
        data: assets,
    };

    console.log(jsonObject2);

      // send data to assets controller
      fetch('/panel/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(jsonObject2),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
        });

      const cmp = editor.Components.getComponents();
    var componentesfinal = cmp.toArray();

    console.log(componentesfinal);

    async function procesarComponente(i) {
      if (i < componentesfinal.length) {

        console.log(componentesfinal);
        var htmlString = componentesfinal[i].toHTML();

        try {
          const response = await fetch('http://127.0.0.1:5000/parseHtml', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({'html_string': htmlString}),
          });

          const data = await response.json();
          console.log('Respuesta del servidor:', data);

          var keys = Object.keys(data);
          var clave = keys[0];
          var valor = data[clave];

          jsondatafinal[clave] = valor;
      

          // Llamada recursiva para procesar el siguiente componente
          await procesarComponente(i + 1);
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else {
        // Todos los componentes han sido procesados, imprimir el resultado
        console.log(jsondatafinal);

        var jsonObject = {
          id: invitacionId,
          tipo: 'data',
          data: jsondatafinal
      };

      fetch('/panel/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(jsonObject),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
        });

        // Convertir el array de objetos a una cadena JSON y guardarlo en el localStorage
        var jsondataString = JSON.stringify(jsondatafinal);
        localStorage.setItem("jsondata", jsondataString);

        // Puedes asignar jsondatafinal directamente si es necesario
        jsondata = jsondatafinal;
      }
    }

    await procesarComponente(0);


    }
  });
  

  var assets = {};

  // Verificar sino assets está vacío
  if (Object.keys(jsonassets).length !== 0) {
     
    assets = jsonassets;
  
  }



const dc = editor.DomComponents;

const bm = editor.BlockManager;

const deviceManager = editor.Devices;


for (var i = 0; i < component.length; i++) {


  if(component[i].nombre == 'portada'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component[i].style.replace(/&amp;/g, '&');

    var bloqueEspecifico = `#portada-${component[i].tipo} {background-image: url("${jsonassets['portada-' + component[i].tipo + '-mobile']}");}`;

    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return assets ? eval(p1) : '';
    });

    console.log(cssActualizado);

   
    // add block
    bm.add( component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Portada',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
      }
    });

    // add component type

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            components: htmlActualizado,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            styles: cssActualizado,
            void: false,
            droppable:false,
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {

          const selected = deviceManager.getSelected();

          console.log(url);

          if (url) {
            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }

    
            model.setStyle({
              'background-image': `url("${url}")`,
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
              'height': '100vh',
              'position':'relative',
              'display':'flex',
              'flex-direction':'column',
              'justify-content':'center',
              'align-items':'center',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
    
            })
          }
        }
      }
    });

  }

  if(component[i].nombre == 'historia'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Historia',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
    

  }

  if(component[i].nombre == 'hashtag'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Hashtag',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults:{
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }

  if(component[i].nombre == 'canciones'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Canciones',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: 'Canciones',
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }

  if(component[i].nombre == 'eventos'){

    console.log(component[i].ComponentHijo);


    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Eventos',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  
    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;

    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {
        
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<div class="owl-carousel eventos" >`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="card card-eventos p-4">
        <img src="${valor['card-img-top-eventos']}"  class="card-img-top-eventos"/>
        <div class="card-body">
          <h5 class="card-title">${valor['card-title']}</h5>
          <div class="divhorario">
            <span>${valor['default']}</span>
          </div>
          <h5 class="card-lugar">${valor['card-lugar']}</h5>
          <span class="card-text">${valor['card-text']}</span>
          <br/>
          <br/>
          <a href="#" class="botonEventos">${valor['botonEventos']}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div>';

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component[i].ComponentHijo.style,
          droppable: false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Eventos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            $('.eventos').owlCarousel({
              loop: false,
              margin: 15,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                1000: {
                  items: 2
                }
              }
            })
            
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "eventos",
          };
        }
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");
    
          html = `
                          <div class="carousel-wrap" ${stringGrapes}>
                            <div class="owl-carousel eventos" ${stringGrapes}>`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="card card-eventos p-4" ${stringGrapes}>
                        <img class="card-img-top-eventos" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/registro-civi-3-1024x768.jpeg" >
                        <div class="card-body" ${stringGrapes}>
                          <h5 class="card-title">CEREMONIA</h5>
                          <div class="divhorario" ${stringGrapes}>
                            <span>30/12/2023 19:00hs</span>
                          </div>
                          <h5 class="card-lugar">REGISTRO CIVIL CENTRAL</h5>
                          <span class="card-text">Blvr. Chacabuco 737, Córdoba</span>
                          <br>
                          <br>
                          <a href="#" class="botonEventos">VER UBICACION</a>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
  
    
          var css = `.eventos{
    
                      padding: 4% 1% 4% 1%;
                    
                  }
    
                  .owl-carousel{
                    display: flex !important;  // to override display:bloc i added !important
                    flex-direction: row;   
                    justify-content: center;  // to center you carousel
                }`;

          var style = model.getStyle();
    
          const content = model.setStyle(style);
    
    
        }
    
    
      },
    });


  }

  if(component[i].nombre == 'contador'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component[i].style.replace(/&amp;/g, '&');


    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Contador',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
        
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {

          const selected = deviceManager.getSelected();

          console.log(selected.id);

          console.log(url);

          if (url) {

            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }

            console.log(assets);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'padding': '60px 0px 40px 0px',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
            })
          }
        }
      }
    })

    var startTime = '2024-07-25 00:00';

    var endTxt = 'Termino la espera';

    if(assets['contador'] && typeof assets['contador'].startTime !== 'undefined'){

      startTime = assets['contador'].startfrom

    }

    if(assets['contador'] && typeof assets['contador'].endTxt !== 'undefined'){

      endTxt = assets['contador'].endTxt

    }

    let c = {

      // Default style
      defaultStyle: true,
    
      // Default start time, eg. '2018-01-25 00:00'
      startTime: startTime,
    
      // Text to show when the countdown is ended
      endText: endTxt,
    
      // Date input type, eg, 'date', 'datetime-local'
      dateInputType: 'date',
    
      // Countdown class prefix
      countdownClsPfx: 'countdown',
    
      // Countdown label
      labelCountdown: 'Countdown',
    
      // Countdown category label
      labelCountdownCategory: 'Extra',
    
      // Days label text used in component
      labelDays: 'Dias',
    
      // Hours label text used in component
      labelHours: 'Horas',
    
      // Minutes label text used in component
      labelMinutes: 'Minutos',
    
      // Seconds label text used in component
      labelSeconds: 'Segundos',
    };

    console.log(c.startTime)
    
    const domc = editor.DomComponents;
    const defaultType99 = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType99.model;
    const defaultView99 = defaultType99.view;
    const textModel = textType.model;
    const textView = textType.view;
    const pfx = c.countdownClsPfx;
    const COUNTDOWN_TYPE = 'countdown';

    var cssWestern = `<style>
                      .${pfx} {
                        text-align: center;
                        
                      }

                      .${pfx}-block {
                        display: inline-block;
                        margin: 0 25px;
                        padding: 10px;
                      }

                      .${pfx}-digit {
                        font-size: 4rem;
                      }

                      .${pfx}-endtext {
                        font-size: 5rem;
                      }

                      .${pfx}-cont,
                      .${pfx}-block {
                        display: inline-block;
                        font-family: "Noto Serif Display", Sans-serif !important;
                        font-style: italic;
                        color:white !important;
                      }
                    </style>`;

    var cssBoho = `<style>
                    .${pfx} {
                      text-align: center;
                      
                    }

                    .${pfx}-block {
                      display: inline-block;
                      margin: 0 25px;
                      padding: 10px;
                    }

                    .${pfx}-digit {
                      font-size: 4rem;
                      font-weight: 700;
                    }

                    .${pfx}-endtext {
                      font-size: 5rem;
                    }

                    .${pfx}-label {

                      olor: #FFFFFF;
                      font-family: "Montserrat", Sans-serif;
                      font-size: 18px;
                      font-weight: 700;
                      text-transform: capitalize;
                    }

                    .${pfx}-cont,
                    .${pfx}-block {
                      display: inline-block;
                      font-family: "Meow Script", Sans-serif !important;
                      font-style: italic;
                      color:white !important;
                    }
                  </style>`;
    
    
    
    domc.addType('countdownWestern', {
      model: {
        defaults: {
          startfrom: c.startTime,
          endText: c.endText,
          droppable: false,
          styles: cssActualizado,
          traits: [{
            label: 'Start',
            name: 'startfrom',
            changeProp: 1,
            type: c.dateInputType,
          },{
            label: 'End text',
            name: 'endText',
            changeProp: 1,
          }],
          script: function() {

            var startfrom = '{[ startfrom ]}';
            var endTxt = '{[ endText ]}';
            console.log(startfrom);
            localStorage.setItem('startfrom', startfrom);
            localStorage.setItem('endTxt', endTxt);
            console.log(endTxt);
            var countDownDate = new Date(startfrom).getTime();
            var countdownEl = this.querySelector('[data-js=countdown]');
            var endTextEl = this.querySelector('[data-js=countdown-endtext]');
            var dayEl = this.querySelector('[data-js=countdown-day]');
            var hourEl = this.querySelector('[data-js=countdown-hour]');
            var minuteEl = this.querySelector('[data-js=countdown-minute]');
            var secondEl = this.querySelector('[data-js=countdown-second]');
            var oldInterval = this.gjs_countdown_interval;
            if(oldInterval) {
              oldInterval && clearInterval(oldInterval);
            }
    
            var setTimer = function (days, hours, minutes, seconds) {
              dayEl.innerHTML = days < 10 ? '0' + days : days;
              hourEl.innerHTML = hours < 10 ? '0' + hours : hours;
              minuteEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
              secondEl.innerHTML = seconds < 10 ? '0' + seconds : seconds ;
            }
    
            var moveTimer = function() {
              var now = new Date().getTime();
              var distance = countDownDate - now;
              var days = Math.floor(distance / 86400000);
              var hours = Math.floor((distance % 86400000) / 3600000);
              var minutes = Math.floor((distance % 3600000) / 60000);
              var seconds = Math.floor((distance % 60000) / 1000);
    
              setTimer(days, hours, minutes, seconds);
    
              /* If the count down is finished, write some text */
              if (distance < 0) {
                clearInterval(interval);
                endTextEl.innerHTML = endTxt;
                countdownEl.style.display = 'none';
                endTextEl.style.display = '';
              }
            };
    
            if (countDownDate) {
              var interval = setInterval(moveTimer, 1000);
              this.gjs_countdown_interval = interval;
              endTextEl.style.display = 'none';
              countdownEl.style.display = '';
              moveTimer();
            } else {
              setTimer(0, 0, 0, 0);
            }
          }
        },
      }, 
        isComponent(el) {
          if(el.getAttribute &&
            el.getAttribute('data-gjs-type') == COUNTDOWN_TYPE) {
            return {
              type: COUNTDOWN_TYPE
            };
          }
        },
    
        view:{
        init() {
          this.listenTo(this.model, 'change:startfrom change:endText', this.updateScript);
          const comps = this.model.get('components');
    
          // Add a basic countdown template if it's not yet initialized
          if (!comps.length) {
            comps.reset();
            comps.add(`
              <span data-js="countdown" class="${pfx}-cont" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-day" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelDays}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-hour" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelHours}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-minute" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelMinutes}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-second" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelSeconds}</div>
                </div>
              </span>
              <span data-js="countdown-endtext" class="${pfx}-endtext"></span>
            `);
          }
    
        }
      },
    });

    domc.addType('countdownBoho', {
    
      model: {
        defaults: {
          ...defaultModel.prototype.defaults,
          startfrom: c.startTime,
          endText: c.endText,
          droppable: false,
          styles: cssBoho,
          traits: [{
            label: 'Start',
            name: 'startfrom',
            changeProp: 1,
            type: c.dateInputType,
          },{
            label: 'End text',
            name: 'endText',
            changeProp: 1,
          }],
          script: function() {
            
            var startfrom = '{[ startfrom ]}';
            var endTxt = '{[ endText ]}';
            console.log(startfrom);
            console.log(endTxt);

            var countDownDate = new Date(startfrom).getTime();
            var countdownEl = this.querySelector('[data-js=countdown]');
            var endTextEl = this.querySelector('[data-js=countdown-endtext]');
            var dayEl = this.querySelector('[data-js=countdown-day]');
            var hourEl = this.querySelector('[data-js=countdown-hour]');
            var minuteEl = this.querySelector('[data-js=countdown-minute]');
            var secondEl = this.querySelector('[data-js=countdown-second]');
            var oldInterval = this.gjs_countdown_interval;
            if(oldInterval) {
              oldInterval && clearInterval(oldInterval);
            }
    
            var setTimer = function (days, hours, minutes, seconds) {
              dayEl.innerHTML = days < 10 ? '0' + days : days;
              hourEl.innerHTML = hours < 10 ? '0' + hours : hours;
              minuteEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
              secondEl.innerHTML = seconds < 10 ? '0' + seconds : seconds ;
            }
    
            var moveTimer = function() {
              var now = new Date().getTime();
              var distance = countDownDate - now;
              var days = Math.floor(distance / 86400000);
              var hours = Math.floor((distance % 86400000) / 3600000);
              var minutes = Math.floor((distance % 3600000) / 60000);
              var seconds = Math.floor((distance % 60000) / 1000);
    
              setTimer(days, hours, minutes, seconds);
    
              /* If the count down is finished, write some text */
              if (distance < 0) {
                clearInterval(interval);
                endTextEl.innerHTML = endTxt;
                countdownEl.style.display = 'none';
                endTextEl.style.display = '';
              }
            };
    
            if (countDownDate) {
              var interval = setInterval(moveTimer, 1000);
              this.gjs_countdown_interval = interval;
              endTextEl.style.display = 'none';
              countdownEl.style.display = '';
              moveTimer();
            } else {
              setTimer(0, 0, 0, 0);
            }
          }
        },
      }, 
        isComponent(el) {
          if(el.getAttribute &&
            el.getAttribute('data-gjs-type') == COUNTDOWN_TYPE) {
            return {
              type: COUNTDOWN_TYPE
            };
          }
        },
    
        view:{
        init() {
          this.listenTo(this.model, 'change:startfrom change:endText', this.updateScript);
          const comps = this.model.get('components');
    
          // Add a basic countdown template if it's not yet initialized
          if (!comps.length) {
            comps.reset();
            comps.add(`
              <span data-js="countdown" class="${pfx}-cont" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-day" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelDays}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-hour" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelHours}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-minute" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelMinutes}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-second" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelSeconds}</div>
                </div>
              </span>
              <span data-js="countdown-endtext" class="${pfx}-endtext"></span>
            `);
          }
    
        }
      },
    });

  }

  if(component[i].nombre == 'mensaje'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component[i].style.replace(/&amp;/g, '&');


    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

  
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Mensaje',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: cssActualizado ,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {

          const selected = deviceManager.getSelected();

          console.log(selected.id);

          if (url) {

            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }


            console.log(assets);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)',
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
            })
          }
        }
      }
    })

  }

  if(component[i].nombre == 'confirmacion'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Confirmacion',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }

  if(component[i].nombre == 'regalos'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });



    const script = function() {
      
      $(document).ready(function() {

      });
    };

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Regalos',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            script,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {

      
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<div class="carousel-wrap re contenregalo pt-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false" style="display:none;">
                                    <div class="owl-carousel regalos2" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="card card-regalo p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
        <img class="card-img-top-regalo" src="${valor['card-img-top-regalo']}" alt="Card image cap">
        <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
          <h5 class="card-title">${valor['card-title']}</h5>
          <span class="card-descripcion">${valor['card-descripcion']}</span>
          <h5 class="cardprecio mt-3">${valor['cardprecio']}</h5>
          <br>
          <a href="${valor['botonRegalo'].src}" class="botonRegalo">${valor['botonRegalo'].text}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div></div>';         
      

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component[i].ComponentHijo.style,
          droppable: false,
          attributes: { id: component[i].ComponentHijo.nombre+'-'+component[i].ComponentHijo.tipo },
          traits: [
            
            {
              type: "number",
              name: "cantidadRegalos",
              label: "N° de Regalos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadRegalos ]}";
    
            $('.regalos2').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: true,
              autoplayHoverPause: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1000: {
                  items: 3
                }
              }
            })
            
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "listaregalos",
          };
        }
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadRegalos", this.onActive);
          this.listenTo(model, "change:cantidadRegalos", this.updateScript);
          this.listenTo(model, "change:cantidadRegalos", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadRegalos");
    
          html = `<div class="carousel-wrap re contenregalo pt-4" style="display:none;" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                    <div class="owl-carousel regalos2" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="card card-regalo p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                      <img class="card-img-top-regalo" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/D_NQ_NP_885930-MLA47397157459_092021-O.webp" alt="Card image cap">
                      <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                        <h5 class="card-title">LAMPARA COLGANTE</h5>
                        <span class="card-descripcion">Lampara Campana Colgante 40cm Nórdica Escandinaba Madera</span>
                        <h5 class="cardprecio mt-3">$36452</h5>
                        <br>
                        <a href="" class="botonRegalo">REGALAR</a>
                      </div>
                    </div>`;
    
          };
    
          html += `</div>
                  </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          console.log('hola');
    
          var css = `.owl-carousel{
                      display: flex !important;  // to override display:bloc i added !important
                      flex-direction: row;   
                      justify-content: center;  // to center you carousel
                    }`;
    
          const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }

  if(component[i].nombre == 'galeria'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label ,
      category: "Galeria",
      content: {
            type: component[i].nombre+'-'+component[i].tipo
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {

      
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<div class="carousel-wrap" >
      <div class="owl-carousel galeria owl-theme" >`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="item">
        <img class="imgGaleria" src="${valor['imgGaleria']}" class="img"/>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div></div>';         
      

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component[i].ComponentHijo.style,
          droppable: false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Fotos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },

            {
              type: "number",
              name: "cantidadEventPorPagina",
              label: "N° de Fotos por pagina",
              placeholder: '0-100',
              min: 1, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadEvent ]}";

            var cantidadEventporPagina = "{[ cantidadEventPorPagina ]}";

            if(cantidadEventporPagina == ''){

              cantidadEventporPagina = 3 ;
            }

            console.log(cantidadEventporPagina);
    
            var carousel = $('.galeria');
    
            carousel.on('initialized.owl.carousel', async (event) => {
    
              var items = event.item.count;
    
              var currentItems = carousel.find('.owl-item');
    
              console.log("Todos los elementos:", currentItems);
    
            });
    
            $('.galeria').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: false,
              autoplayHoverPause: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: cantidadEventporPagina
                },
                1000: {
                  items: cantidadEventporPagina
                }
              }
            });
    
     
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "Galeria2",
          };
        }
      },
    
      view:{
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);

          this.listenTo(model, "change:cantidadEventPorPagina", this.updateScript);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");
    
          html = `<div class="carousel-wrap" >
          <div class="owl-carousel galeria owl-theme">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="item">
            <img class="imgGaleria" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/Sin-titulo-1_Mesa-de-trabajo-1-576x1024.jpg" class="img"/>
          </div>`;
    
          };
    
          html += ` </div>
                    </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          var css = `
                .owl-carousel{
                  display: flex !important;  // to override display:bloc i added !important
                  flex-direction: row;   
                  justify-content: center;  // to center you carousel
              }`;
    
          //const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }

  if(component[i].nombre == 'testigos'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label ,
      category: "Testigos",
      content: {
            type: component[i].nombre+'-'+component[i].tipo
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {
        
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 = `<div class="owl-carousel padrinos" >`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class=" text-card card-testigo">
        <img src="${valor['card-img-padrinos']}" alt="Card image cap" class="card-img-padrinos"/>
                  <div class="card-body">
                    <h5 class="card-name-padrino text-dark">${valor['card-name-padrino']}
                    </h5>
                    <span class="card-relacion text-dark">${valor['card-relacion']}</span>
                    <br/>
                  </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div>';

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component[i].ComponentHijo.style,
          void: false,
          droppable: false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadTestigos",
              label: "N° de testigos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadTestigos ]}";
    
    
            var carousel = $('.galeria');
    
            carousel.on('initialized.owl.carousel', async (event) => {
    
              var items = event.item.count;
    
              var currentItems = carousel.find('.owl-item');
    
              console.log("Todos los elementos:", currentItems);
    
            });
    
            $('.padrinos').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: false,
              autoplayHoverPause: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                1000: {
                  items: 2
                }
              }
            });
    
     
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "Galeria2",
          };
        }
      },
    
      view:{
        init({ model }) {
          this.listenTo(model, "change:cantidadTestigos", this.onActive);
          this.listenTo(model, "change:cantidadTestigos", this.updateScript);
          this.listenTo(model, "change:cantidadTestigos", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadTestigos");
    
          html = `<div class="carousel-wrap"  >
                                <div class="owl-carousel padrinos" >`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="text-center card-testigo">
                        <img class="card-img-padrinos" src="https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/09/radek-homola-TYPU7klExAw-unsplash.jpg" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-name-padrino text-dark">Laura</h5>
                          <span class="card-relacion text-dark">Hermana</span>
                          <br>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>`;
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          var css = `
        
              @media only screen and (max-width: 768px){
                .titulopadrinos {
                font-size: 30px;
                width: 100% !important;
                  }
              }
      
              .card-img-padrinos{
        
                width: 176px !important;
                border-radius: 50% !important;
                margin: 0 auto;
              }
          
              .card-name-padrino{
          
                font-family: "Montserrat", Sans-serif;
                font-size: 18px;
              }
          
              .card-relacion{
          
                font-family: "Montserrat", Sans-serif;
                font-weight: 600;
                font-size: 16px;
              }`;
    
          //const content = model.setStyle(css);
    
    
        }
    
    
      },
    });


  }

  if(component[i].nombre == 'vestimenta'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Vestimenta',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults:  {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }

  if(component[i].nombre == 'transporte'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'Transporte',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }

  if(component[i].nombre == 'divisor'){

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'divisor',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: component[i].html ,
            styles: component[i].style ,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }

  if(component[i].nombre == 'lugar'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'lugar',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })


  }

  if(component[i].nombre == 'dressInsta'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'dress-insta',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }

  if(component[i].nombre == 'HoraDia'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'HoraDia',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })


  }

  if(component[i].nombre == 'navbar'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label,
      category: 'navbar',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            tagName: 'nav',
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { class: 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolled', },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }


}

//para cerrar los collapse de las blocks

const categories = editor.BlockManager.getCategories();
categories.each(category => {
	category.set('open', false).on('change:open', opened => {
		opened.get('open') && categories.each(category => {
            category !== opened && category.set('open', false)
        })
	})
})

//add fonts google al styler

let styleManager = editor.StyleManager;
let typographySector = styleManager.getSector('typography');
let fontProperty = styleManager.getProperty('typography', 'font-family');
console.log(fontProperty);
let list = fontProperty.get('options');
list.push({ value: 'Playfair Display', name: 'Playfair Display' });
list.push({ value: 'Noto Serif Display', name: 'Noto Serif Display' });
list.push({ value: 'Meow Script', name: 'Meow Script' });
list.push({ value: 'Montserrat', name: 'Montserrat' });
list.push({ value: 'Oooh Baby', name: 'Oooh Baby' });
list.push({ value: 'Playfair Display SC', name: 'Playfair Display SC' });
list.push({ value: 'Alata', name: 'Alata' });
list.push({ value: 'Birthstone', name: 'Birthstone' });
fontProperty.set('options', list);
styleManager.render();


//add fonts style 

let styleManager1 = editor.StyleManager;
const property = styleManager1.addProperty('typography', {
  label: 'font style',
  property: 'font-style',
  type: 'select',
  default: 'normal',
  options: [
   { id: 'normal', label: 'normal' },
   { id: 'italic', label: 'italic' },
  ],
}, { at: 0 });

//agregar id a portada




//limitar que solo este en el canva un solo component por categoria

editor.on('block:drag:start', function (component, block, error) {
  // Obtén la categoría del bloque que se está intentando agregar

  console.log(component);
  
  var nuevaCategoria = component.attributes.category.attributes.label;

  if(nuevaCategoria == 'Portada'){

  }
  
});

//console.log(componentInvitacion);

/*if(componentInvitacion.length > 0){

  componentInvitacion.forEach(el => {

    editor.addComponents({
      type: el,
    });
  
  });

}*/



const all = editor.getComponents();

var modelosfinal = all.models ;

modelosfinal.forEach(el => {

  console.log(el.attributes.name);

  if(el.attributes.name.includes('portada') || el.attributes.name.includes('contador') || el.attributes.name.includes('mensaje')){

    const randomId = el.attributes.name;

    el.addAttributes({
      id: randomId,
    })

  }

});


if(jsondata != null){

  Object.keys(jsondata).forEach(function (clave) {

    const valor = jsondata[clave];
    console.log(`${clave}: ${JSON.stringify(valor)}`);
  
    editor.addComponents({
      type: clave
    });
  
  });


}


















