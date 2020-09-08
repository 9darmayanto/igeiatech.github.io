$('body').on('click', '[history-back]', function(){
  window.history.back();
})


$('body').on('click', '[data-go-manual]', function(event){
  event.preventDefault();

  var nama = event.target.getAttribute('nameTable');
  var links = event.target.getAttribute('data-go-manual');
  var data = event.target.getAttribute('data-print');

  helper.sesiNew('data-manual-'+nama, data);

  location.href = links;

})

  $("body").on("click", "#login-btn", async function(event){
      event.preventDefault()
      console.log('koko')

      function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
      }

      var dataTable = document.getElementById('login-btn-get');
      var formData = new FormData(dataTable);
      var mydata1 = '';
      var mydata2 = '';
      var nom = 0;
      var formCek = '';

      var getMydata = {};

      for(var pair of formData.entries()) {
          if(nom === 0){
              if (pair[1] === "" && formCek === "") {
                  formCek = pair[0];
              }
              mydata1 += pair[0];
              mydata2 += '"'+escapeHtml(pair[1])+'"';
              getMydata[pair[0]] = pair[1];
          }else{
              if (pair[1] === "" && formCek === "") {
                  formCek = pair[0];
              }
              mydata1 += ','+pair[0];
              mydata2 += ',"'+escapeHtml(pair[1])+'"';
              getMydata[pair[0]] = pair[1];
          }
          nom++;
      }

      console.log(formCek)

      if (formCek != "") {
          $(`#${formCek}`).focus()
      }else{
          var dataquery = await helper.query(`SELECT * FROM login WHERE username="${getMydata['username']}" AND password = "${getMydata['password']}"`);


          if (dataquery[0] != undefined) {

              helper.sesiNew('login-data', helper.encryptG(dataquery[0]));

              location.href = "#/";

          }else{
              alert('Maaf password atau username anda salah');
          }


      }


   })

// area login


$('body .select2').select2();


$("body").on("click", "#click", function() {
  alert("gugus");
})

$("body").on("click", "[bulan-transaksi]", function(){

  var data = $(this).attr("data-date");
  var bulan = $(this).attr("data-date-asli");
  var tahun = helper.sesiGet('tahun');
  var date = new Date(tahun, data);
  var tanggalAkhir = date.getUTCDate();

  var rangeTransaksi = {
      dateOne: tahun+'-'+bulan+'-01',
      dateTwo: tahun+'-'+bulan+'-'+tanggalAkhir
  }

  helper.sesiNew("tanggal-transaksi", tahun.substring(2, 4)+'-'+bulan);

  location.href = "#/transaksi-2";

})


$("body").on('click', "#logout", (event) => {
  event.preventDefault();
  helper.sesiNew('login-data', '');
  location.reload();
})


$("body").on("click", "[crud-view-data-on-hide]", function(event){
  event.preventDefault()
    var mydata = $(this).attr('data-keep');
    var go = $(this).attr('data-go');
    var goKey = $(this).attr('data-key');
    var namaTable = event.target.getAttribute('nama-table');


    helper.sesiNew(goKey, mydata);


    helper.sesiG('back-last')

      if (helper.sesiG('back-last') === null || helper.sesiG('back-last') === "") {
          console.log('ok')
          var dataN = {
              history: []
          };
          helper.sesiN('back-last', dataN);
      }

      var gData = helper.sesiG('back-last').history;
      gData.push(location.hash);
      helper.sesiN('back-last', {history: gData});
      console.log(helper.backup.locationBefore);
      location.href = go;
      // location.reload();
})

$("body").on("click", "[menuju]", function(){

  var go = $(this).attr('data-go');
  location.href = go;
  location.reload();

})


$("body").on("click", "[print-data]", function(){

  var Div = $(this).attr('data-position');

  var rotation = $(this).attr('rotation');

  console.log(rotation);

  if (rotation === "landscape") {
    helper.printDivLanscape(Div);
    console.log('yes');
  }else{
    console.log('no');
    helper.printDiv(Div);
  }

})

$("body").on('change', '[go-to-persediaan]', function(event){

  event.preventDefault();

  var val = $(this).val();

  persediaan.persediaan(val);

})



$("body").on('change', '[akun-action]', function(event){
  event.preventDefault();

  var val = $(this).val();
  var script = $(this).attr('script-data');
  var sesiName = $(this).attr('sesi-name');

  if (sesiName != undefined) {
      helper.sesiNew(sesiName, val);
  }else{
      helper.sesiNew('akun', val);
  }

  eval(script);

})


$(`body`).on('keyup', '.rupiah', function(event){
          event.preventDefault();
          var number = $(this).val()
          var data = number.toString()
          .replace(/a/g, '')
          .replace(/A/g, '')
          .replace(/b/g, '')
          .replace(/B/g, '')
          .replace(/c/g, '')
          .replace(/C/g, '')
          .replace(/d/g, '')
          .replace(/D/g, '')
          .replace(/e/g, '')
          .replace(/E/g, '')
          .replace(/f/g, '')
          .replace(/F/g, '')
          .replace(/g/g, '')
          .replace(/G/g, '')
          .replace(/h/g, '')
          .replace(/H/g, '')
          .replace(/i/g, '')
          .replace(/I/g, '')
          .replace(/j/g, '')
          .replace(/J/g, '')
          .replace(/k/g, '')
          .replace(/K/g, '')
          .replace(/l/g, '')
          .replace(/L/g, '')
          .replace(/M/g, '')
          .replace(/m/g, '')
          .replace(/n/g, '')
          .replace(/N/g, '')
          .replace(/o/g, '')
          .replace(/O/g, '')
          .replace(/p/g, '')
          .replace(/P/g, '')
          .replace(/q/g, '')
          .replace(/Q/g, '')
          .replace(/r/g, '')
          .replace(/R/g, '')
          .replace(/s/g, '')
          .replace(/S/g, '')
          .replace(/t/g, '')
          .replace(/T/g, '')
          .replace(/u/g, '')
          .replace(/U/g, '')
          .replace(/v/g, '')
          .replace(/V/g, '')
          .replace(/w/g, '')
          .replace(/W/g, '')
          .replace(/x/g, '')
          .replace(/X/g, '')
          .replace(/y/g, '')
          .replace(/Y/g, '')
          .replace(/z/g, '')
          .replace(/Z/g, '')
          .replace(/\{/g, '')
          .replace(/\}/g, '')
          .replace(/\[/g, '')
          .replace(/\]/g, '')
          .replace(/\:/g, '')
          .replace(/\;/g, '')
          .replace(/\'/g, '')
          .replace(/\"/g, '')
          .replace(/\</g, '')
          .replace(/\>/g, '')
          .replace(/\?/g, '')
          .replace(/\//g, '')
          ;
          data = data.split('.');
          var data1 = data[0];
          var data2 = data[1];

          if(data1.length > 3){

              data1 = data1.replace(/\,/g, '');

              var sisa = data1.length % 3;

              var depan = data1.substr(0, sisa);

              rupiah = data1.substr(sisa).match(/\d{3}/g);

              if(rupiah != null){
                  rupiah = rupiah.join(',');
              }

              if(rupiah === null){
                  rupiah = '';
              }

              if(data2 != undefined){
                      if(sisa === 0){
                          rupiah = rupiah+'.'+data2;
                          $(this).val(rupiah);
                      }else{
                          rupiah = depan+','+rupiah+'.'+data2;
                          $(this).val(rupiah);
                      }
              }else{
                  if(sisa === 0){
                      rupiah = rupiah;
                      $(this).val(rupiah);
                  }else{
                      rupiah = depan+','+rupiah;
                      $(this).val(rupiah);
                  }
              }
          }else{
            if(data2 != undefined){
              return data1+'.'+data2;
            }else{
              return data1;
            }
          }
      })


      // action 2



        $('body').on('click', '[history-back-2]', function(){
          window.history.back();
          setTimeout(()=>{
            document.location.reload();
          }, 300);
        })

        $("body").on('hover', 'select', function(e) {
            var $target = $(e.target);
           if($target.is('option')){
               console.log('yuhuuu');
           }

        });

        function delay(callback, ms) {
          var timer = 0;
          return function() {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
              callback.apply(context, args);
            }, ms || 0);
          };
        }


        $('body').on('click', "[approve-data]", async (event) => {
          event.preventDefault()
          var table = event.target.getAttribute('table')

          var row =  event.target.getAttribute('row-approve');
          var key =  event.target.getAttribute('key');
          var back =  event.target.getAttribute('halaman-kembali');

          var txt;
      var r = confirm("anda yakin ingin approve ?");
      if (r == true) {
        await helper.query(`UPDATE ${table} SET ${row} = '1' WHERE ${key} = ${helper.backup.approve[key]} `);
        alert('sudah approve');
        location.href= back;
      } else {
        alert('anda mebatalkannya');
      }



        })


        $('body').on('click', "[approve-batal]", async (event) => {
          event.preventDefault()
          var table = event.target.getAttribute('table')

          var row =  event.target.getAttribute('row-approve');
          var key =  event.target.getAttribute('key');
          var back =  event.target.getAttribute('halaman-kembali');

          var txt;
      var r = confirm("anda yakin ingin membatalkan transaksi ?");
      if (r == true) {
        await helper.query(`UPDATE ${table} SET ${row} = '2' WHERE ${key} = ${helper.backup.approve[key]} `);
        alert('transaksi sudah dibatalkan');
        location.href= back;
      } else {
        alert('perintah dibatalkan');
      }



        })



        $("body").on("change", "[script]", (event) => {
          event.preventDefault();
          var data = event.target.getAttribute('script');
          helper.sesiN(event.target.getAttribute('key'), event.target.value);
          eval(data);
        })

        // area view

        $('body').on('click', '[kembali-ke-halaman-sebelumnya]', (event) => {
          var lokasi = helper.backup.locationBefore;
          location.href = lokasi;
          setTimeout(() => {
            var tablename = helper.backup.locationTablename;
            var databackup = helper.backup.backuptableset;
            crudtransaksi.set(tablename, databackup)
            crudtransaksi.view(tablename);
            document.getElementById("judul-table")
            .innerHTML = helper.backup.namaJudul;
          }, 300)
        })

        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };



        $('body').on('click', '[kembali-ke-halaman-sebelumnya-normal]', (event) => {
          var lokasi = helper.sesiG('back-last').history;
          console.log(lokasi)
          var back = lokasi[(lokasi.length - 1)]
          lokasi.pop()
          helper.sesiN('back-last', {history: lokasi});
          location.href = back;
        })


        $('body').on('click', '[go-pagin-crud]', (event) => {
          console.log('hub');
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var page = data('page')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))

          crudtransaksi.view(data('table'), Number(length), Number(page * length), Number(paginStart), Number(paginEnd), cari, orderby, orderset);

        })

        $('body').on('click', '[go-pagin-crud-prev]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))

          if ((Number(paginStart) - 7) >= 0) {
            crudtransaksi.view(data('table'), Number(length), (Number(paginStart) - 7) * Number(length), Number(paginStart) - 7, Number(paginEnd) - 7, cari, orderby, orderset);
          }else{

          }

        })


        $('body').on('change', '[go-pagin-crud-reload-date]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }
          helper.sesiNew(data('sesi'), event.target.value)

          var databackup = helper.backup[data('table')];

          var bulanTahun = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');

          var filter3 = {
            key: "tanggal_permintaan",
            value: bulanTahun
          }

          if(filter3 != undefined) {
            databackup.filter3 = filter3;
          }else{
            if (databackup.filter3 != undefined) {
              delete databackup.filter3;
            }
          }

          console.log(databackup);

          crudtransaksi.set(data('table'), databackup);

          crudtransaksi.view(data('table'));

        })



        $('body').on('click', '[go-pagin-crud-next]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
          if ((Number(paginStart) + 7) < totalHalaman) {
            crudtransaksi.view(data('table'), Number(length), (Number(paginStart) + 7) * Number(length), Number(paginStart) + 7, Number(paginEnd) + 7, cari, orderby, orderset);
          }else{

          }

        })

      $('body').on('keyup', '[go-pagin-crud-search]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = event.target.value;
          var orderby = data('orderby')
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
            crudtransaksi.view(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset);

        }, 300))

      $('body').on('change', '[go-pagin-crud-show]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          console.log(event.target.value)

          var total = data('total')
          var length = event.target.value;
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari');
          var orderby = data('orderby')
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
            crudtransaksi.view(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset);

        }, 300))

      $('body').on('change', '[go-crud-view-order]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          console.log(event.target.value)

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari');
          var orderby = event.target.value
          var orderset = data('orderset')
          var totalHalaman = Number(Math.ceil(total / length));

          $('[go-crud-view-order-set]').attr('data-orderby', event.target.value);

          // if(Number(start + 1))
            crudtransaksi.view(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset);

        }, 300))


        $('body').on('change', '[go-crud-view-order-set]', delay(function(event) {
            event.preventDefault();
            const data = (a) => {
              return event.target.getAttribute('data-'+a);
            }

            var databackup = helper.backup[data('table')];

            crudtransaksi.set(data('table'), databackup);

            console.log(event.target.value)

            var total = data('total')
            var length = data('length')
            var paginStart = data('pagin-start')
            var paginEnd = data('pagin-end')
            var start = data('start')
            var cari = data('cari');
            var orderby = data('orderby')
            var orderset = event.target.value
            var totalHalaman = Number(Math.ceil(total / length));

            $('[go-crud-view-order]').attr('data-orderset', event.target.value);

            // if(Number(start + 1))
              crudtransaksi.view(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset);

          }, 300))

      $('body').on('change', '[go-crud-view-order-edt]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          console.log(event.target.value)

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari');
          var orderby = event.target.value
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          $('[go-crud-view-order-set]').attr('data-orderby', event.target.value);

          $('body [data-orderby]').attr('data-orderby', event.target.value);

          // if(Number(start + 1))
            crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);

        }, 300))

        $('body').on('change', '[go-crud-view-fill-edt]', async (event) => {
            event.preventDefault();
            const data = (a) => {
              return event.target.getAttribute('data-'+a);
            }

            var databackup = helper.backup[data('table')];

            crudtransaksi.set(data('table'), databackup);

            var nilaidata = helper.decryptG(event.target.value);

            console.log(nilaidata);

            var dataFilter = await helper.query(`SELECT * FROM ${nilaidata.table}`)

            dataFilter = dataFilter.map((item, i) => {
              return `
                <option value="${item[nilaidata.id]}">${item[nilaidata.nama]}</option>
              `;
            }).join("")

            $('body [go-crud-view-fillset-edt]').html(`<option value="">All</option>`+dataFilter);
            $(`body [data-filltable]`).attr('data-filltable', nilaidata.table);
            $('body [data-rowP]').attr('data-rowP', nilaidata.target)

            // var total = data('total')
            // var length = data('length')
            // var paginStart = data('pagin-start')
            // var paginEnd = data('pagin-end')
            // var start = data('start')
            // var cari = data('cari');
            // var orderby = data('orderby')
            // var orderset = data('orderset')
            // var filltable = data('filltable')
            // var fillnilai = event.target.value
            // var rowP = data('rowP')
            // var totalHalaman = Number(Math.ceil(total / length));
            //
            // $('body [data-fillnilai]').attr('data-fillnilai', event.target.value)
            //
            //
            // // if(Number(start + 1))
            //   crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);

          })


      $('body').on('change', '[go-crud-view-fillset-edt]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          console.log(event.target.value)

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari');
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = event.target.value
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          $('body [data-fillnilai]').attr('data-fillnilai', event.target.value)


          // if(Number(start + 1))
            crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);

        }, 300))


        $('body').on('change', '[go-crud-view-order-set-edt]', delay(function(event) {
            event.preventDefault();
            const data = (a) => {
              return event.target.getAttribute('data-'+a);
            }

            var databackup = helper.backup[data('table')];

            crudtransaksi.set(data('table'), databackup);

            console.log(event.target.value)

            var total = data('total')
            var length = data('length')
            var paginStart = data('pagin-start')
            var paginEnd = data('pagin-end')
            var start = data('start')
            var cari = data('cari');
            var orderby = data('orderby')
            var orderset = event.target.value
            var filltable = data('filltable')
            var fillnilai = data('fillnilai')
            var rowP = data('rowP')
            var totalHalaman = Number(Math.ceil(total / length));

            $('body [data-orderset]').attr('data-orderset', event.target.value)

            // if(Number(start + 1))
              crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);

          }, 300))




        // select multiple on rolll --------------------------------------///


        $('body').on('focus', '[crud-table-update-data-multi]', async (event) =>{

          event.preventDefault()

          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }


          helper.backup.dataa  = {
            row: event.target.getAttribute("data-row"),
            value: ""
          }

          helper.backup.hapus = {

            key:event.target.getAttribute("data-key"),
            id:event.target.getAttribute("data-id")

          }

          helper.backup.tags = event.target;


          var id = data('id')
          var f = data('f')
          var value = data('a')
          var datas = helper.decryptG(data('select'))


          var namaTable = event.target.getAttribute('table-name');

          helper.backup.namaTable = namaTable;

          var datafilter = helper.backup[namaTable].listData.filter((item) => {
            if (item != null) {
                if (item.table ===  f) {
                return item.fill;
              }
            }
          })[0];

          helper.backup.selectmultiplevalue = event.target.value;


          helper.backup.valueTarget = event.target.value;

          event.target.value = "";



          var dataname = event.target.getAttribute('table-show');
          document.getElementById(`select-multiple`).style.display = `flex`;
          document.getElementById(`title-modal`).innerHTML = dataname.replace(/\_/g, " ");

          var domp = document.getElementById('select-multiple-body');

          // var getdata = await helper.query(``)

          helper.backup.datapilihan = await helper.query(`SELECT * FROM ${f} `);

          var filtershows = await helper.query(`SELECT * FROM ${Object.keys(datafilter.fill)[0]} `);

          var idpertama = null;

          filtershow = filtershows.map((item, z) => {
            var nama = item[datafilter.fill[Object.keys(datafilter.fill)[0]].nama]
            var id = item[datafilter.fill[Object.keys(datafilter.fill)[0]].id]
            if (z === 0) {
              idpertama = id;
            }
            return `<option value="${id}">${nama}</option>`
          }).join("");


          helper.backup.datas = datas;


          var html = `
              <div style="padding:10px; text-align: center;">
                <input crud-table-search-go  data-target="${datafilter.fill[Object.keys(datafilter.fill)[0]].target}" data-id="${filtershows[0][datafilter.fill[Object.keys(datafilter.fill)[0]].id]}" class="form-control" style="max-width: calc(100% - 440px); display: inline-block;" placeholder="search">
                <select class="form-control" style="max-width:150px; display: inline-block;">
                  ${Object.keys(datafilter.fill).map((item) => {return `<option>${item}</option>` }).join("")}
                </select>
                <select class="form-control" data-target="${datafilter.fill[Object.keys(datafilter.fill)[0]].target}" crud-table-filter-go style="max-width:150px; display: inline-block;">
                ${filtershow}
                </select>
                <button crud-table-close-go class="btn btn-danger">x</button>
              </div>
              <div style="max-height: calc(100% - 40px); overflow-y: auto;" id="data-listing">
              <div crud-table-update-data-multi-save class="hover-button-list" id="">Empty</div>
                ${helper.backup.datapilihan.map((item) => {
                  if (item[datafilter.fill[Object.keys(datafilter.fill)[0]].target] === idpertama) {
                    return `
                    <div crud-table-update-data-multi-save class="hover-button-list" id="${item[datas.id]}">${item[datas.nama]}</div>
                    `;
                  }
                }).join("")}
              </div>

          `;

          domp.innerHTML = html;

          console.log(id)
          console.log(f)
          console.log(value)
          console.log(datas)

        })






        $('body').on('change', '[crud-table-filter-go]', (event) => {
          event.preventDefault();

          var target = event.target.getAttribute('data-target');
          var value = event.target.value;

          console.log(target);

          var domp = document.getElementById('data-listing');


          domp.innerHTML = helper.backup.datapilihan.map((item) => {
            if (item[target] === value) {
              return `
                <div crud-table-update-data-multi-save class="hover-button-list" id="${item[helper.backup.datas.id]}">${item[helper.backup.datas.nama]}</div>
              `;
            }
          }).join("");

          $('body [crud-table-search-go]').attr('data-id', value);

        })

        $('body').on('keyup', '[crud-table-search-go]', (event) => {
          event.preventDefault();

          var target = event.target.getAttribute('data-target');
          var value = event.target.getAttribute('data-id');;

          console.log(target);

          var domp = document.getElementById('data-listing');


          domp.innerHTML = helper.backup.datapilihan.map((item) => {
            if (item[target] === value) {
              if (item[helper.backup.datas.nama].toLowerCase().includes(event.target.value.toLowerCase())) {
                return `
                <div crud-table-update-data-multi-save class="hover-button-list" id="${item[helper.backup.datas.id]}">${item[helper.backup.datas.nama]}</div>
                `;
              }
            }
          }).join("");


        })





        $('body').on('click', '[crud-table-update-data-multi-save]', (event) => {

          event.preventDefault()
          var namaTable = helper.backup.namaTable;
          var data = helper.backup.dataa;
          var hapus = helper.backup.hapus;
          var value = event.target.getAttribute('id');
          var text = event.target.innerText;
          data.value = value;
          console.log(data);
          var nilaiData = JSON.stringify(data);
          var hapusData = JSON.stringify(hapus);
          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            if (value != "") {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });
            console.log(tableD);
            tableD.push(res.data);
            helper.localNew(namaTable, helper.encryptG(tableD));
          }

            document.getElementById(`select-multiple`).style.display = `none`;
            if (value != "") {
            helper.backup.tags.value = text;
          }else{
            helper.backup.tags.value = "N/A";
          }
          })
        })


        $('body').on('click', '[crud-table-close-go]', (event) => {

          event.preventDefault()

            document.getElementById(`select-multiple`).style.display = `none`;

            helper.backup.tags.value = helper.backup.valueTarget;


        })





        // ---------------------------------

        $('body').on('keydown', '[crud-table-update-data-multi]', async (event) =>{

          event.preventDefault()

          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }


          helper.backup.dataa  = {
            row: event.target.getAttribute("data-row"),
            value: ""
          }

          helper.backup.hapus = {

            key:event.target.getAttribute("data-key"),
            id:event.target.getAttribute("data-id")

          }

          helper.backup.tags = event.target;


          var id = data('id')
          var f = data('f')
          var value = data('a')
          var datas = helper.decryptG(data('select'))


          var namaTable = event.target.getAttribute('table-name');

          helper.backup.namaTable = namaTable;

          var datafilter = helper.backup[namaTable].listData.filter((item) => {
            if (item != null) {
                if (item.table ===  f) {
                return item.fill;
              }
            }
          })[0];

          helper.backup.selectmultiplevalue = event.target.value;

          event.target.value = "";



          var dataname = event.target.getAttribute('table-show');
          document.getElementById(`select-multiple`).style.display = `flex`;
          document.getElementById(`title-modal`).innerHTML = dataname.replace(/\_/g, " ");

          var domp = document.getElementById('select-multiple-body');

          // var getdata = await helper.query(``)

          helper.backup.datapilihan = await helper.query(`SELECT * FROM ${f} `);

          var filtershow = await helper.query(`SELECT * FROM ${Object.keys(datafilter.fill)[0]} `);

          var idpertama = null;

          filtershow = filtershow.map((item, z) => {
            var nama = item[datafilter.fill[Object.keys(datafilter.fill)[0]].nama]
            var id = item[datafilter.fill[Object.keys(datafilter.fill)[0]].id]
            if (z === 0) {
              idpertama = id;
            }
            return `<option value="${id}">${nama}</option>`
          }).join("");


          helper.backup.datas = datas;


          var html = `
              <div style="padding:10px; text-align: center;">
                <input class="form-control" style="max-width: calc(100% - 440px); display: inline-block;" placeholder="search">
                <select class="form-control" style="max-width: 200px; display: inline-block;">
                  ${Object.keys(datafilter.fill).map((item) => {return `<option>${item}</option>` }).join("")}
                </select>
                <select class="form-control" data-target="${datafilter.fill[Object.keys(datafilter.fill)[0]].target}" crud-table-filter-go style="max-width: 200px; display: inline-block;">
                ${filtershow}
                </select>
              </div>
              <div style="max-height: calc(100% - 40px); overflow-y: auto;" id="data-listing">
              <div crud-table-update-data-multi-save class="hover-button-list" id="">Empty</div>
                ${helper.backup.datapilihan.map((item) => {
                  if (item[datafilter.fill[Object.keys(datafilter.fill)[0]].target] === idpertama) {
                    return `
                    <div crud-table-update-data-multi-save class="hover-button-list" id="${item[datas.id]}">${item[datas.nama]}</div>
                    `;
                  }
                }).join("")}
              </div>

          `;



          domp.innerHTML = html;





          console.log(id)
          console.log(f)
          console.log(value)
          console.log(datas)



        })


        // select multiple end rolll --------------------------------------///










      // area edit


        $('body').on('click', '[go-pagin-crud-edt]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var page = data('page')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))

          crudtransaksi.edit(data('table'), Number(length), Number(page * length), Number(paginStart), Number(paginEnd), cari, orderby, orderset, filltable, fillnilai, rowP);

        })

        $('body').on('click', '[go-pagin-crud-prev-edt]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))

          if ((Number(paginStart) - 7) >= 0) {
            crudtransaksi.edit(data('table'), Number(length), (Number(paginStart) - 7) * Number(length), Number(paginStart) - 7, Number(paginEnd) - 7, cari, orderby, orderset, filltable, fillnilai, rowP);
          }else{

          }

        })

        $('body').on('click', '[go-pagin-crud-next-edt]', (event) => {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari')
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
          if ((Number(paginStart) + 7) < totalHalaman) {
            crudtransaksi.edit(data('table'), Number(length), (Number(paginStart) + 7) * Number(length), Number(paginStart) + 7, Number(paginEnd) + 7, cari, orderby, orderset, filltable, fillnilai, rowP);
          }else{

          }

        })


        $('body').on('change', '[go-pagin-crud-show-edt]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          console.log(event.target.value)

          var total = data('total')
          var length = event.target.value;
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = data('cari');
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
            crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);

        }, 300))



      $('body').on('keyup', '[go-pagin-crud-search-edt]', delay(function(event) {
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var cari = event.target.value;
          var orderby = data('orderby')
          var orderset = data('orderset')
          var filltable = data('filltable')
          var fillnilai = data('fillnilai')
          var rowP = data('rowP')
          var totalHalaman = Number(Math.ceil(total / length));

          // if(Number(start + 1))
          if ((Number(paginStart) + 7) < totalHalaman) {
            crudtransaksi.edit(data('table'), Number(length), 0, 0, 7, cari, orderby, orderset, filltable, fillnilai, rowP);
          }else{

          }

        }, 300))








        // pagination action on top




        $("body").on("click", "button[go-crud-edit]", function(){

          var namaTable = $(this).attr("table-name");
          crud.edit(namaTable);

        })

        $("body").on("click", "button[go-crud-edit-duo]", function(){

          var namaTable = $(this).attr("table-name");
          crudtransaksi.edit(namaTable);

        })

        $("body").on("click", "button[go-crud-edit-3]", function(){

          var namaTable = $(this).attr("table-name");
          crud3.edit(namaTable);

        })

        $("body").on("click", "button[go-back-crud-view]", function(event){

          event.preventDefault();

          var dataType = event.target.getAttribute('data-type');

          var namaTable = $(this).attr("table-name");

          if (dataType === "crudtransaksi") {
            crudtransaksi.view(namaTable);
          }else{
            crud.view(namaTable);
          }


        })

        $("body").on("click", "button[go-back-crud-view-ganda]", function(event){

          event.preventDefault();


          var datak = {nama:"kuku", umur: 9}


          var nama = event.target.getAttribute('nama')


          if (document.getElementById("judul-table") != null) {
            document.getElementById("judul-table")
            .innerHTML = nama;
            helper.backup.namaJudul = nama;
          }


          console.log(JSON.stringify(datak))

          var namaTable = event.target.getAttribute('table-name');

          var dataType = event.target.getAttribute('data-type');

          var filterk = JSON.parse(event.target.getAttribute('data-filter'));

          var filterl = JSON.parse(event.target.getAttribute('data-filter-2'));

          var dataSend = JSON.parse(event.target.getAttribute('data-send'));


          var databackup = helper.backup[namaTable];


          if (filterk != undefined) {
            databackup.filter = filterk;
          }else{
            if (databackup.filter != undefined) {
              delete databackup.filter;
            }
          }

          if (filterl != undefined) {
            databackup.filter2 = filterl;
          }else{
            if (databackup.filter2 != undefined) {
              delete databackup.filter2;
            }
          }

          if (dataSend != undefined) {
            if (databackup.dataSend != undefined) {
              Object.keys(dataSend).forEach(function(item){
                if (databackup.dataSend[item] != undefined){
                  databackup.dataSend[item] = dataSend[item]
                }
              })
            }
          }

          $('.active2').addClass('btn-custome')

          event.target.setAttribute('class', 'active2');

           helper.backup.backuptableset = databackup;

           helper.backup.backuptablenama = namaTable;

          crudtransaksi.set(namaTable, databackup);

          crudtransaksi.view(namaTable);

        })

        $("body").on("click", "button[go-back-crud-view-duo]", function(event){
          event.preventDefault();
          var nama = event.target.getAttribute('nama')

          if (document.getElementById("judul-table") != null) {
            document.getElementById("judul-table")
            .innerHTML = nama;
          }

          $('.active2').addClass('btn-custome')

          event.target.setAttribute('class', 'active2');

          var namaTable = event.target.getAttribute('table-name')
          crudtransaksi.view(namaTable);

        })

        $("body").on("click", "button[go-back-crud-view-3]", function(){

          var namaTable = $(this).attr("table-name");
          crud3.view(namaTable);

        })

        $("body").on("click", "button[go-back-crud-view-2]", function(){

          var namaTable = $(this).attr("table-name");
          crud2.view(namaTable);

        })

        $("body").on("click", "button[tambah-data-baru-crud]", function(){


          var params = new URLSearchParams();


          var namaTable = $(this).attr("table-name");

          var dataSend =  $(this).attr("data-send");

          if (dataSend != "") {
            params.append('data', JSON.stringify(helper.decryptG(dataSend)));
          }

          params.append('table', namaTable);
          var dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
          .then(res =>{
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable));
            tableD.push(res.data);
            helper.localNew(namaTable, helper.encryptG(tableD));

            crud.edit(namaTable);

          });

        })

        $("body").on("click", "button[tambah-data-baru-crud-duo]", function(){


          var params = new URLSearchParams();


          var namaTable = $(this).attr("table-name");

          var dataSend =  $(this).attr("data-send");

          if (dataSend != "") {
            params.append('data', JSON.stringify(helper.decryptG(dataSend)));
          }

          params.append('table', namaTable);
          var dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
          .then(res =>{
            console.log(res.data);
            if (helper.localGet(namaTable) != null) {
              var tableD = helper.decryptG(helper.localGet(namaTable));
              tableD.push(res.data);
              helper.localNew(namaTable, helper.encryptG(tableD));
            }

            var databackup = helper.backup[namaTable];

            crudtransaksi.set(namaTable, databackup);

            crudtransaksi.edit(namaTable);

          });

        })

        $("body").on("click", "button[tambah-data-baru-crud-3]", function(){


          var params = new URLSearchParams();


          var namaTable = $(this).attr("table-name");

          var dataSend =  $(this).attr("data-send");

          if (dataSend != "") {
            params.append('data', JSON.stringify(helper.decryptG(dataSend)));
          }

          params.append('table', namaTable);
          var dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
          .then(res =>{
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable));
            tableD.push(res.data);
            helper.localNew(namaTable, helper.encryptG(tableD));

            crud3.edit(namaTable);

          });

        })

        $("body").on("click", "button[crud-data-hapus]", function(){

          var namaTable = $(this).attr("table-name");

          var hapus = {
            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")
          }

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
          .then(res =>{
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            helper.localNew(namaTable, helper.encryptG(tableD));

            crud.edit(namaTable);

          });

        })

        $("body").on("click", "button[crud-data-hapus-duo]", function(event){

          event.preventDefault()

          var namaTable = $(this).attr("table-name");

          var hapus = {
            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")
          }

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
          .then(res =>{
            console.log(res.data);
            if (helper.localGet(namaTable) != null) {

            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            helper.localNew(namaTable, helper.encryptG(tableD));

            }

            const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var page = data('page')
          var cari = data('cari')
          var totalHalaman = Number(Math.ceil(total / length));


          // if(Number(start + 1))

          // crudtransaksi.edit(data('table'), Number(length), Number(page * length), Number(paginStart), Number(paginEnd), cari);

            crudtransaksi.set(namaTable, databackup);

            crudtransaksi.edit(namaTable, Number(length), page, Number(paginStart), Number(paginEnd), cari);

          });

        })

        $("body").on("click", "button[crud-data-hapus-3]", function(){

          var namaTable = $(this).attr("table-name");

          var hapus = {
            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")
          }

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
          .then(res =>{
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            helper.localNew(namaTable, helper.encryptG(tableD));

            crud3.edit(namaTable);

          });

        })

        $("body").on("change", "input[crud-table-update-data][type='date']", delay(function(){

          var namaTable = $(this).attr("table-name");


          var data  = {
            row: $(this).attr("data-row"),
            value: $(this).val()
          }

          if ($(this).attr('type') === 'rupiah') {
            data  = {
              row: $(this).attr("data-row"),
              value: $(this).val().replace(/\,/g, '')
            }
          }

          console.log(data);

          var hapus = {

            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")

          }

          var nilaiData = JSON.stringify(data);

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            tableD.push(res.data);

            helper.localNew(namaTable, helper.encryptG(tableD));

          })

        },300));

        $("body").on("keyup", "input[crud-table-update-data]", delay(function(){

          var namaTable = $(this).attr("table-name");


          var data  = {
            row: $(this).attr("data-row"),
            value: $(this).val()
          }

          if ($(this).attr('type') === 'rupiah') {
            data  = {
              row: $(this).attr("data-row"),
              value: $(this).val().replace(/\,/g, '')
            }
          }

          console.log(data);

          var hapus = {

            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")

          }

          var nilaiData = JSON.stringify(data);

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            tableD.push(res.data);

            helper.localNew(namaTable, helper.encryptG(tableD));

          })

        },300));

        $("body").on("change", "select[crud-table-update-data]", delay(function(){

          var namaTable = $(this).attr("table-name");

          var data  = {
            row: $(this).attr("data-row"),
            value: $(this).val()
          }

          var hapus = {

            key: $(this).attr("data-key"),
            id: $(this).attr("data-id")

          }

          var nilaiData = JSON.stringify(data);

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            tableD.push(res.data);

            helper.localNew(namaTable, helper.encryptG(tableD));

          })

        },300));

        $("body").on("keyup", `input[data-row="harga_total"]`, function() {

          var namaTable = "transaksi_pembelian_barang";

          var table = $(this).attr('table-name');
          console.log(table);
          var number = 0;
          if (table === "data_pembelian_barang") {
            $(`body input[data-row="harga_total"]`).each(function(){
               number += Number($(this).val());
            })
          }
          var dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-type-transaksi-umum'));

          var data  = {
            row: "nominal",
            value: number
          }

          var hapus = {

            key: "id",
            id: dataTypeTransaksi.id

          }

          var nilaiData = JSON.stringify(data);

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);

            tableD.push(res.data);

            helper.localNew(namaTable, helper.encryptG(tableD));

          })

        })


        $("body").on("change", "[master-open-data]", function(event){
          event.preventDefault()
          var nilai = event.target.value;
          var databackup = helper.backup[nilai];
          databackup.domp = "crud";

          if (nilai === "data_barang") {
            crudtransaksi.set(nilai, databackup);
            crudtransaksi.view(nilai);
          }else{
            crudtransaksi.set(nilai, databackup);
            crudtransaksi.view(nilai);
          }




        })

        $("body").on('click', '[close-modal]', function(event){
          event.preventDefault();
          const data = (a) => {
            return event.target.getAttribute('data-'+a);
          }

          var databackup = helper.backup[data('table')];

          crudtransaksi.set(data('table'), databackup);

          var total = data('total')
          var length = data('length')
          var paginStart = data('pagin-start')
          var paginEnd = data('pagin-end')
          var start = data('start')
          var page = data('page')
          var cari = data('cari')
          var totalHalaman = Number(Math.ceil(total / length));


          // if(Number(start + 1))

          // crudtransaksi.edit(data('table'), Number(length), Number(page * length), Number(paginStart), Number(paginEnd), cari);
          crudtransaksi.edit(data('table'), Number(length), page, Number(paginStart), Number(paginEnd), cari);


        })


        $("body").on('click', '[modal-show-data]', function(event){
          event.preventDefault();

          var namaTable = event.target.getAttribute('table-name');

          var data = event.target.getAttribute('table-show');

          document.getElementById(`modal-${namaTable}`).style.display = `block`;

          document.getElementById(`title-modal`).innerHTML = data.replace(/\_/g, " ");

          var databackup = helper.backup[data];
          databackup.domp = "include-master-data";
          console.log(databackup);
          crudtransaksi.set(data, databackup);
          crudtransaksi.view(data);

        })

        $('body').on('click', '[data-go-print]', function(event){
          event.preventDefault()
          var url = $(this).attr('data-go-print');

          helper.sesiNew('dataprint', $(this).attr('data-print'));

          helper.sesiNew('nameTable', $(this).attr('nameTable'));

          helper.sesiNew('pageBefore', location.hash);

          location.href = url;

        })

        $('body').on('click', '[kembali-ke-sebelum-nya]', function(event){
          event.preventDefault();

          location.href = helper.sesiGet('pageBefore');

          var nama = helper.sesiGet('nameTable');

        })


        // area select 3



        $('body').on('click', '.select3', function(event){
          event.preventDefault();
          var id = event.target.getAttribute('id')
          var func = event.target.getAttribute('func-open')
          var close = event.target.getAttribute('func-close')
          var dataId = event.target.getAttribute('data-id')
          var dataKey = event.target.getAttribute('data-key')
          var dataRow = event.target.getAttribute('data-row')
          var tableName = event.target.getAttribute('table-name')
          document.querySelectorAll(`#${id} option`).forEach((item, i) => {
            item.style.display = "none";
          });
          var dataSelect = Array.from(document.querySelectorAll(`#${id} option`)).map((item, i) => {
              if(i == 0){
                return `
                <div class="modal-select3">
                <div func-open="${func}" func-close="${close}" class="select3-show">
                <span>Pilih Data <span table-name="${tableName}" class="close-select3"  data-option="${item.getAttribute('data-option')}" ><i>x</i></span> </span>
                <div style="overflow: auto; max-height: 200px;">
                <span data-id="${dataId}" data-key="${dataKey}" data-row="${dataRow}" table-name="${tableName}" data-option="${item.getAttribute('data-option')}"  func-open="${func}" func-close="${close}" data-select3 data-value="">
                  Batal
                </span>
                `;
              }else if((Array.from(document.querySelectorAll(`#${id} option`)).length) - 1 == i){
                return `
                <span data-id="${dataId}" data-key="${dataKey}" data-row="${dataRow}" table-name="${tableName}" data-option="${item.getAttribute('data-option')}"  func-open="${func}" func-close="${close}" data-select3 data-value="${item.value}">
                ${item.innerText}
                </span>
                <div>
                </div>
                </div>
                `;
              }else{
                return `
                <span data-id="${dataId}" data-key="${dataKey}" data-row="${dataRow}" table-name="${tableName}" data-option="${item.getAttribute('data-option')}" func-open="${func}" func-close="${close}" data-select3 data-value="${item.value}">
                  ${item.innerText}
                </span>
                `;
              }
          }).join("");

          document.body.innerHTML += dataSelect;

        })



        $("body").on("click", "span[data-select3]", delay(function(event){

          var nilai = event.target.getAttribute('data-value');
          var table = event.target.getAttribute('table-name');
          var tableRow = event.target.getAttribute('data-row');
          var tableKey = event.target.getAttribute('data-key');
          var tableId = event.target.getAttribute('data-id');

          console.log(nilai);


          $(`select[table-name="'${table}'"] option`).val([]);

          document.querySelectorAll('select[table-name="'+table+'"] option').forEach((item) => {
            if(item.getAttribute('value') == nilai){
              item.setAttribute('selected', '');
            }
          })


          var namaTable = table;

          var data  = {
            row: tableRow,
            value: nilai
          }

          var hapus = {

            key: tableKey,
            id: tableId

          }

          var nilaiData = JSON.stringify(data);

          var hapusData = JSON.stringify(hapus);

          var params = new URLSearchParams();
          params.append('table', namaTable);
          params.append('data', nilaiData);
          params.append('hapus', hapusData);
          var dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
          .then(res => {
            console.log(res.data);
            var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
              if (eval(`res.${hapus.key}`) != hapus.id) {
                return res;
              }
            });

            console.log(tableD);
            tableD.push(res.data);
            helper.localNew(namaTable, helper.encryptG(tableD));
            $('body .modal-select3').remove();
            closeModalViewOption(helper.decryptG(event.target.getAttribute('data-option')));
          })



        },300));










        var openModalViewOption =  delay( async function(a, b){

          var data = helper.decryptG(helper.localGet(b['optionMop']['table']));

              data = data.filter((item) => {
                if(item[b['optionMop']['dataKey']] == a){
                  return item;
                }
              });
          // var data = await helper.query(`SELECT * FROM ${b['optionMop']['table']} WHERE ${b['optionMop']['dataKey']} = '${a}' `);
          helper.dataO[b.table]['optionMop']['func'](data);
        },50)

        function closeModalViewOption(a){
          helper.dataclosesementara = helper.dataO[a.table]['optionMop']['close'];
          helper.dataO[a.table]['optionMop']['close']();
        }

        $("body").on('mouseover', '.select3-show', function(event){
          var target = $(event.target);
          var parent = event.target.parentNode;
          if(target.is("[data-select3]")){
            var value = event.target.getAttribute('data-value');
            if (value != "") {
              openModalViewOption(value,helper.decryptG(event.target.getAttribute('data-option')));
            }
          }
        })

        $("body").on('mouseout', '.select3-show', function(event){
          var target = $(event.target);
          var parent = event.target.parentNode;
          if(target.is("[data-select3]")){
            var value = event.target.getAttribute('data-value');
            if (value != "") {
              closeModalViewOption(helper.decryptG(event.target.getAttribute('data-option')));
            }
          }
        })

        $("body").on('click', '.close-select3', function(event){
          event.preventDefault();
          var table = event.target.getAttribute('table-name');
          $('body .select3').css('display', 'block');
          if ($('body .select3-show') != undefined) {
            $('body .modal-select3').remove();
            helper.dataclosesementara();
          }
        })

        window.document.querySelectorAll('.select3').forEach((item, i) => {
            item.addEventListener('click', function(event){
              // document.querySelector(`body`).innerHTML += dataSelect;
            })
            item.parentNode.addEventListener('mouseleave', function(event){
              event.preventDefault()
              event.target.querySelector('.select3').style.display = 'block';
              if (event.target.querySelector('.select3-show') != undefined) {
                event.target.querySelector('.select3-show').remove();
              }
            })
        });


// action 3


	$("body").on("click", "[crud2-back]", function(event){
		event.preventDefault();
		// a
		var a = $(this).attr('crud2-name');
		// b
		var b = $(this).attr('crud2-type');
		// page know
		var pageKnow = $(this).attr('page-know');

		var c = Number(pageKnow);

		if ((Number(pageKnow) - 10 ) >= 0) {
			c = Number(pageKnow) - 10;
			crud2.view(a, b, c);
		}else{
			alert('kamu ada di halaman awal');
		}
	})

	$("body").on("click", "[crud2-next]", function(event){
		event.preventDefault();
		// a
		var a = $(this).attr('crud2-name');
		// b
		var b = $(this).attr('crud2-type');

		var total = Number($(this).attr('crud2-total')) * 10;
		// page know
		var pageKnow = $(this).attr('page-know');

		var c = Number(pageKnow);

		if ((Number(pageKnow) + 10 ) <= total) {
			c = Number(pageKnow) + 10;
			crud2.view(a, b, c);
		}else{
			alert('kamu ada di halaman akhir');
		}
	})

	$("body").on("change", "[crud2-choice]", function(event){
		event.preventDefault();
		// a
		var a = $(this).attr('crud2-name');
		// b
		var b = $(this).attr('crud2-type');

		var total = Number($(this).attr('crud2-total')) * 10;
		// page know
		var pageKnow = $(this).attr('page-know');

		var c = Number($(this).val())*10;

		crud2.view(a, b, c);
	})

	$("body").on("click", "[modal-close]", function(event){
    event.preventDefault();

    var table = $(this).attr('modal-act');

    $(`body #modal-tambah-${table}`).css('display', 'none');

  })

  $("body").on("click", "[modal-close-master]", function(event){
    event.preventDefault();

    var table = $(this).attr('modal-act');

    var table3 = $(this).attr('master');

    $(`body #${table}`).css('display', 'none');

		$(`body #makeFormCrud3`).html(crud2.makeFormNew(table3));

  })

  $("body").on("click", "[modal-tambah-data]", function(event){
    event.preventDefault();

    var table = $(this).attr('data-table');

    $(`body #modal-tambah-${table}`).css('display', 'block');

  })


  $("body").on("click", "[open-master]", function(event){
    event.preventDefault();
		var table = $(this).attr('master');
    $("body #modal-master").css('display', 'block');
		crud3.view(table);
  })

	$("body").on("click", "button[go-crud-edit-3]", function(){

    var namaTable = $(this).attr("table-name");
    crud3.edit(namaTable);

  })

	$("body").on("click", "button[tambah-data-baru-crud-3]", function(){


    var params = new URLSearchParams();


    var namaTable = $(this).attr("table-name");

    var dataSend =  $(this).attr("data-send");

    if (dataSend != "") {
      params.append('data', JSON.stringify(helper.decryptG(dataSend)));
    }

    params.append('table', namaTable);
    var dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
    .then(res =>{
      console.log(res.data);
      var tableD = helper.decryptG(helper.localGet(namaTable));
      tableD.push(res.data);
      helper.localNew(namaTable, helper.encryptG(tableD));

      crud3.edit(namaTable);

    });

  })

	$("body").on("click", "button[go-back-crud-view-3]", function(){

    var namaTable = $(this).attr("table-name");
    crud3.view(namaTable);

  })

	$("body").on("click", "button[crud-data-hapus-3]", function(){

    var namaTable = $(this).attr("table-name");

    var hapus = {
      key: $(this).attr("data-key"),
      id: $(this).attr("data-id")
    }

    var hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('hapus', hapusData);
    var dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
    .then(res =>{
      console.log(res.data);
      var tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      helper.localNew(namaTable, helper.encryptG(tableD));

      crud3.edit(namaTable);

    });

  })

  // the last action


  	// set year
  	var date = new Date();

  	// year Know
  	var year = date.getFullYear();

  	helper.sesiNew('tahun', year);

  	// get month
  	var month = helper.formatId('00', date.getMonth()+1);

  	helper.sesiNew('bulan', month);

  	$('body').on('change', '[list-bkk]', (event) => {
  		event.preventDefault()
  		var value = event.target.value;

  		helper.sesiNew('pilihanBkk', value);

  		console.log('yah');

  		bkk.bkk();

  	})

  	$('body').on('click', '[run-helper]', function(event){

  		var script = event.target.getAttribute('data-script');

  		eval(script)

  	})


  	$('body').on('click', '[details-kas]', (event) => {
  		event.preventDefault()
  		$('#modal-hide').css('display', 'flex');
  		bukubesar0.view(1)
  	})

  	$('body').on('click', '[close-modal-kas]', (event) => {
  		event.preventDefault()
  		$('#modal-hide').css('display', 'none');
  	})


  	$("body").on("change", "[tahun-action]", function(){
  		var tahun = $(this).val();
  		helper.sesiNew('tahun', tahun);
  		var getScrip = $(this).attr('script-data');
  		eval(getScrip);
  	})

  	$("body").on("change", "[bulan-action]", function(){
  		var tahun = $(this).val();
  		helper.sesiNew('bulan', tahun);
  		var getScrip = $(this).attr('script-data');
  		eval(getScrip);
  	})

  	$("body").on("click", "[journal-menu]", function(){
  		var getScrip = $(this).attr('script-data');
  		eval(getScrip);
  	})

  	$("body").on("click", "[bkk-menu]", function(){
  		bkk.bkk();
  	})


  	$("body").on("click", "[bkk-print]", function(){
  		var getScrip = $(this).attr('script-data');
  		var bkkView = $(this).attr('data-no-transaksi');
  		helper.sesiNew('no-transaksi', bkkView);
  		eval(getScrip);
  	})

  	$("body").on("click", "[master-data-button]", function(){
  		var dataBack = $(this).attr('data-back');
  		helper.sesiNew('sesi-back', dataBack);

  		location.href = "#/master";

  		// alert("ok");
  	})

  	$("body").on("click", "[back-last]", function(){
  		var back = helper.sesiGet('sesi-back');

  		location.href = back;

  		location.reload();


  	})


  	$("body").on("keyup", "#set-tahun-transaksi", function(){

  		var value = $(this).val();

  		helper.sesiNew('tahun', value);

  	})


  	$("body").on("click", "[data-go]", function(){
  		var data = $(this).attr("data-go-data");
  		eval(data);
  	})
