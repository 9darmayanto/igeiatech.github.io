var crudtransaksi = {};

crudtransaksi.tableData = [];

crudtransaksi.set = function(name, data){

  helper.backup[name] = data;

  crudtransaksi.tableData = crudtransaksi.tableData.filter((item) => {
    if (item.nama != name) {
      return item;
    }
  })

  crudtransaksi.tableData.push({
    nama: name,
    data:data
  });
}

crudtransaksi.view = async function(a = null, b = 5, c = 0, startFrom = 0, endOf = 7, search = "", orderby = "" , orderoption = ""){

  // live(a);

  var crudAct = await crudtransaksi.tableData.filter(function(res){

    if (res.nama === a) {
      return res;
    }

  })[0];

  var crudData = await crudAct.data;


  if (crudData.func != undefined) {
    helper.localNew('chromehashing', helper.encryptG(crudData.func.toString()));
  }


  crudData.tablename = a;

  var html = ``;


  var cekTableArea = document.getElementById(`table-area-${a}`);


  var tanggalSet = helper.sesiGet('tanggal-transaksi');
  var tanggalSet2 = helper.sesiGet('no_bukti_pengeluaran');


  var caridata = ``;

  crudData.table.forEach((item, i) => {
    if (i === 0) {
      caridata += ` ${item} LIKE "%${search}%"`;
    }else{
      caridata += ` OR ${item} LIKE "%${search}%"`;
    }
  })

  var filterD = ``;

  if (crudData.filter != undefined) {
    filterD += ` ${crudData.filter.key} = "${crudData.filter.value}" `;
  }

  if (crudData.filter2 != undefined) {
    filterD += ` AND ${crudData.filter2.key} = "${crudData.filter2.value}" `;
  }

  if (crudData.filter3 != undefined) {
    filterD += ` AND ${crudData.filter3.key} LIKE "%${crudData.filter3.value}%" `;
  }

  if (filterD != "") {
    caridata = ` AND (${caridata}) `;
  }

  // change order data




  if (orderoption === "") {
    if (crudData.orderset != undefined) {
      orderoption = crudData.orderset;
    }else{
      orderoption = "DESC";
    }
  }




  var setOrder = `ORDER BY ${crudData.key} ${orderoption}`;


  if (crudData.orderdefault != undefined) {
    setOrder = `ORDER BY ${crudData.orderdefault} ${orderoption}`;
  }

  if (orderby != "") {
    setOrder = `ORDER BY ${orderby} ${orderoption}`;
  }




  var qr = `SELECT * FROM ${a} WHERE ${filterD} ${caridata} ${setOrder} LIMIT ${c}, ${b}`;

  var objk = await helper.query(qr);


  var qrcount = `SELECT count(*) as total FROM ${a} WHERE ${filterD} ${caridata}  `;
  var objkcount = await helper.query(qrcount);
  objkcount = objkcount[0].total;

  if (cekTableArea === null) {

  html += `
      <style>
        th{
          text-align: center;
          text-transform:capitalize;
        }
      </style>
  `;

  var orderme = `
  <span>Order By :</span>
  <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" style="max-width: 200px; display: inline-block;" class="form-control" go-crud-view-order >
  ${crudData.table.map((item, i) => {
    return `<option value="${item}">${crudData.headname[i]}</option>`
  }).join("")}
  </select>
  <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" style="max-width: 80px; display: inline-block; margin-right: 20px;" class="form-control" go-crud-view-order-set>
    <option>DESC</option>
    <option>ASC</option>
  </select>
  `;

  if (crudData.editdisabled != undefined) {
  }else{
    html +=  `<button table-name="${a}" go-crud-edit-duo class="btn btn-primary btn-sm mb-3">Ubah</button>`;
  }

  html +=  `<div style="margin-bottom: 20px;
  display: grid;
  grid-template-columns: auto auto;
  ">`;
  html +=  `
  <div>
    <span>Show </span>
    <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud-show style="max-width: 60px; display: inline-block; padding: 3px 6px; border-radius: 5px;">
      <option>5
      <option>10
      <option>15
    </select>
    <span>entries </span>
  </div>
  <div style="text-align: right;">
  ${orderme}
    <span>Search: </span>
    <input data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud-search style="max-width: 200px; display: inline-block;" class="form-control" />
  </div>
  `;
  html +=  `</div>`;


  html +=  `<div id="table-area-${a}">`;

  }

  html +=  `<div style="width: 100%; max-width: 100%; overflow-x: auto;">`;
  html +=  `<table id="${a}" class="table table-bordered" style="min-width: 100%;">`;
  html +=  `<thead>`;
  html +=  `<tr class="text-white" style="background-color: #DA251C;">`;
  crudData.headname.forEach((res) => {
    html +=  `<th>`;
      html +=  res;
    html +=  `</th>`;
  });
  if(crudData.customeButtonDataView === true){
      html +=  `<th>`;
        html +=  `#`;
      html +=  `</th>`;
  }
  html +=  `</tr>`;
  html +=  `</thead>`;
  html +=  `<tbody>`;



  // function compare( a, b ) {
  //     if ( a.tanggal_transaksi < b.tanggal_transaksi ){
  //         return -1;
  //     }
  //     if ( a.tanggal_transaksi > b.tanggal_transaksi ){
  //         return 1;
  //     }
  //     return 0;
  // }

  // var objk = dataIsiTable.sort( compare );


  var numero = 1 + Number(c);
  var dateTerakhir = ``;
  var noTransaksi = 1;
  objk.forEach((item) => {
    var {id} = item;
    html +=  `<tr>`;
    var number = 0;
    crudData.table.forEach((res) => {
      if (crudData.headname[number] === 'Tanggal Transaksi') {
        if (dateTerakhir === '') {
          dateTerakhir = eval(`item.${res}`);
        }else{
          if (dateTerakhir === eval(`item.${res}`)) {
            dateTerakhir = eval(`item.${res}`);
          }else{
            dateTerakhir = eval(`item.${res}`);
            noTransaksi += 1;
          }
        }
      }

      var data1 = 0;
      var jlm = 0;
      var hargas = 0;

      if (crudData.headname[number] === 'No Bukti Transaksi') {
        html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
        html += eval(`item.${res}`)+'-'+noTransaksi;
        html +=  `</td>`;
      }else if(crudData.headname[number] === 'Pajak PPN Masukan'){
        data1 = Number(eval(`item.${res}`))/100;
        html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
        html += eval(`item.${res}`)+' %';
        html +=  `</td>`;
      }else if(crudData.headname[number] === 'Harga Total'){
        html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px; text-align: right;">`;
        html +=  '<span style="float: left;">Rp</span> '+helper.formatRupiah((Number(item.harga_satuan) * Number(item.jml)) + (Number(item.harga_satuan) * Number(item.jml) * Number(item.pajak_ppn_masukan) / 100));
        html +=  `</td>`;
      }else{
        if (number === 0) {
          html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px; text-align: center;">`;
          html +=  numero;
          html +=  `</td>`;
        }else{
          if (crudData.form[number] === "select") {
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
            html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
            html +=  `</td>`;
          }else if (crudData.form[number] === "selectNormal") {
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
            html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
            html +=  `</td>`;
          }else if (crudData.form[number] === "selectmultiple") {
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
            html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
            html +=  `</td>`;
          }else if (crudData.form[number] === "noselect") {
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
            html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
            html +=  `</td>`;
          }else if(crudData.form[number] === "rupiah"){
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px; text-align: right;">`;
            html +=  '<span style="float: left;">Rp </span>'+helper.formatRupiah(eval(`item.${res}`));
            html +=  `</td>`;
          }else if(crudData.form[number] === "tanggal"){
            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px; text-align: center;">`;
            if (item[res] != null) {
              html +=  helper.tanggal(eval(`item.${res}`)).sekarang;
            }else{
              html +=  'N/A';
            }
            html +=  `</td>`;
          }else{

            var nilaiNull = eval(`item.${res}`);
            if (nilaiNull === null) {
              nilaiNull = 'N/A';
            }

            html +=  `<td  style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;
            html +=  nilaiNull;
            html +=  `</td>`;
          }
        }
      }
      number++;
    });

    if(crudData.customeButtonDataView === true){
        if(crudData.customeButtonDataPrint != undefined || crudData.customeButtonDataPrintInvoice != undefined){
          html +=  `<td style="min-width: 300px;max-width: 300px;width: 300px; text-align: center;">`;
        }else{
          html +=  `<td style="min-width: 120px;max-width: 120px;width: 120px; text-align: center;">`;
        }
        if (crudData.customeButtonViewGo != undefined) {
          if (crudData.customeButtonName != undefined) {
            html +=  `<button nama-table="${a}" crud-view-data-on-hide data-key="${crudData.customeButtonViewData}" data-go="${crudData.customeButtonViewGo}" data-keep="${helper.encryptG(item)}" class="btn" style="background-color: #0066D5; color: white;">${crudData.customeButtonName}</button>`;
          }else{
            html +=  `<button nama-table="${a}" crud-view-data-on-hide data-key="${crudData.customeButtonViewData}" data-go="${crudData.customeButtonViewGo}" data-keep="${helper.encryptG(item)}" class="btn" style="background-color: #0066D5; color: white;">Tampilkan</button>`;
          }
        }
        if(crudData.customeButtonDataPrint != undefined){
          html +=  ` <button class="btn btn-warning" nameTable="${a}" data-go-print="${crudData.customeButtonDataPrint}/${id}" data-print="${helper.encryptG(item)}" >Print</button>`;
        }
        if(crudData.customeButtonDataPrintPermintaan != undefined){
          html +=  ` <button class="btn btn-warning" nameTable="${a}" data-go-print="${crudData.customeButtonDataPrintPermintaan}/${id}" data-print="${helper.encryptG(item)}" >Tampilkan</button>`;
        }
        if(crudData.customeButtonDataPrintInvoice != undefined){
          html +=  ` <button class="btn btn-warning" nameTable="${a}" data-go-print="${crudData.customeButtonDataPrintInvoice}/${id}/invoice" data-print="${helper.encryptG(item)}" >Invoice</button>`;
        }
        if(crudData.manuallink != undefined){
          html +=  ` <button class="btn btn-warning" nameTable="${a}" data-go-manual="${crudData.manuallink}" data-print="${helper.encryptG(item)}" >${crudData.manuallinkname}</button>`;
        }
      html +=  `</td>`;
    }

    html +=  `</tr>`;
    numero++;
  });

  html +=  `</tbody>`;
  html +=  `</table>`;
  html +=  `</div>`;
  html +=  `<div style="margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto;
  ">`;
  html +=  `
  <div>
    Showing 1 to ${Math.ceil(Number(objkcount / b))} of ${objkcount} entries
  </div>
  <div style="text-align: right;">
    <nav aria-label="Page navigation example" style="display: inline-block;">
      <ul class="pagination">
        <li class="page-item"><a data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}" data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud-prev class="page-link" href="#">Previous</a></li>
        `;

        for (var i = 0; i < Math.ceil(Number(objkcount) / Number(b)); i++) {
          if (i >= startFrom && i < endOf ) {
            if (i === (Number(c) / Number(b))) {
              html +=  `  <li class="page-item active"><a data-page="${i}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud class="page-link" href="#">${Number(i + 1)}</a></li>`
            }else{
              html +=  `  <li class="page-item"><a data-page="${i}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}" data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud class="page-link" href="#">${Number(i + 1)}</a></li>`
            }
          }
        }

        html += `
        <li class="page-item"><a data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}" data-orderby="${orderby}" data-orderset="${orderoption}" go-pagin-crud-next class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
  `;
  html +=  `</div>`;

  if (cekTableArea === null) {

    html +=  `</div>`;

  }

  if (cekTableArea === null) {
    document.getElementById(crudData.domp)
    .innerHTML = html;
  }else{
    cekTableArea.innerHTML = html;
  }

  if(crudData.func != undefined){
    crudData.func();
  }

}

crudtransaksi.edit = async function(a = null, b = 5, c = 0, startFrom = 0, endOf = 7, search = '', orderby = "" , orderoption = "", filltable, fillnilai = "", rowP){

  helper.dataO = {};

  var crudAct = crudtransaksi.tableData.filter(function(res){
    if (res.nama === a) {
      return res;
    }
  })[0];

  var crudData = crudAct.data;

  if (crudData.func != undefined) {
    helper.localNew('chromehashing', helper.encryptG(crudData.func.toString()));
  }

  var dataSend = "";

  if (crudData.dataSend != undefined) {
    dataSend = helper.encryptG(crudData.dataSend);
  }

  crudData.tablename = a;



  var cekTableArea = document.getElementById(`table-area-${a}-edt`);


  var tanggalSet = helper.sesiGet('tanggal-transaksi');
  var tanggalSet2 = helper.sesiGet('no_bukti_pengeluaran');


  if (rowP === undefined || rowP === "") {
    rowP = crudData.table.filter((item, i) => {
      if (crudData.form[i] === "select") {
        return item;
      }
    })[0];
  }
  var listData = crudData.listData.filter((item, i) => {
    if (crudData.form[i] === "select") {
      return item;
    }
  })[0];

  if (listData != undefined) {
    if (filltable === undefined || filltable === "") {
      filltable = listData.table;
    }
  }


  var caridata = ``;

  crudData.table.forEach((item, i) => {
    if (i === 0) {
      caridata += ` ${item} LIKE "%${search}%"`;
    }else{
      caridata += ` OR ${item} LIKE "%${search}%"`;
    }
  })

  var filterD = ``;

  if (crudData.filter != undefined) {
    filterD += ` ${crudData.filter.key} = "${crudData.filter.value}" `;
  }

  if (crudData.filter2 != undefined) {
    filterD += ` AND ${crudData.filter2.key} = "${crudData.filter2.value}" `;
  }

  if (crudData.filter3 != undefined) {
    filterD += ` AND ${crudData.filter3.key} LIKE "%${crudData.filter3.value}%" `;
  }

  var filld = "";


  if (listData != undefined) {
    filld = ` ${rowP} LIKE "%${fillnilai}%" `;
    if (filterD != "") {
      filld = ` AND ${rowP} LIKE "%${fillnilai}%" `;
    }
  }

  if (filterD != "" || filld != "") {
    caridata = ` AND (${caridata}) `;
  }


  if (orderoption === "") {
    if (crudData.orderset != undefined) {
      orderoption = crudData.orderset;
    }else{
      orderoption = "DESC";
    }
  }

  var setOrder = `ORDER BY ${crudData.key} ${orderoption}`;

  if (crudData.orderdefault != undefined) {
    setOrder = `ORDER BY ${crudData.orderdefault} ${orderoption}`;
  }

  if (orderby != "") {
    setOrder = `ORDER BY ${orderby} ${orderoption}`;
  }



  var qr = `SELECT * FROM ${a} WHERE ${filterD} ${filld} ${caridata} ${setOrder} LIMIT ${c}, ${b}`;



  var objk = await helper.query(qr);

  var qrcount = `SELECT count(*) as total FROM ${a} WHERE ${filterD} ${filld} ${caridata} `;
  var objkcount = await helper.query(qrcount);
  objkcount = objkcount[0].total;








  var html = ``;

  if (cekTableArea === null) {


  html += `

      <style>
        th{
          text-align: center;
        }

      </style>

  `;




  var orderme = `
  `;
  if (listData != undefined) {
  orderme += `<span>Filter :</span> <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" style="max-width: 120px; display: inline-block;" class="form-control" go-crud-view-fill-edt>
  ${crudData.table.map((item, i) => {
    if(crudData.form[i] === "select"){
      var listing = crudData.listData[i];
      listing.target = crudData.table[i];
      return `<option value="${helper.encryptG(listing)}">${crudData.headname[i]}</option>`
    }
  }).join("")}
  </select>`;
  }
  if (filltable != undefined) {
    var dataFilter = await helper.query(`SELECT * FROM ${listData.table}`)

    dataFilter = dataFilter.map((item, i) => {
      return `
        <option value="${item[listData.id]}">${item[listData.nama]}</option>
      `;
    }).join("")

    orderme += `
    <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}"  data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" style="max-width: 120px; display: inline-block;" class="form-control"  go-crud-view-fillset-edt >
    <option value="">All</option>
    ${dataFilter}
    </select>`;
  }

  orderme += `<span>Order By :</span>
  <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" style="max-width: 120px; display: inline-block;" class="form-control" go-crud-view-order-edt >
  ${crudData.table.map((item, i) => {
    return `<option value="${item}">${crudData.headname[i]}</option>`
  }).join("")}
  </select>
  <select data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}" data-cari="${search}" data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" style="max-width: 80px; display: inline-block; margin-right: 20px;" class="form-control" go-crud-view-order-set-edt>
    <option>DESC</option>
    <option>ASC</option>
  </select>
  `;
  if (crudData.editdisabled != undefined) {
  }else{
    html +=  `<button table-name="${a}" go-back-crud-view-duo class="btn btn-default btn-sm mb-3 mr-3">Kembali</button>`;
    html +=  `<button table-name="${a}" data-send="${dataSend}" tambah-data-baru-crud-duo class="btn btn-primary btn-sm mb-3">Tambah</button>`;
  }
  html +=  `<div style="margin-bottom: 20px;
  display: grid;
  grid-template-columns: auto auto;
  ">`;
  html +=  `
  <div>
    <span>Show </span>
    <select  data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-cari="${search}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-show-edt  style="max-width: 60px; display: inline-block; padding: 3px 6px; border-radius: 5px;">
      <option>5
      <option>10
      <option>15
    </select>
    <span>entries </span>
  </div>
  <div style="text-align: right;">
    ${orderme}
    <span>Search: </span>
    <input data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-search-edt style="max-width: 200px; display: inline-block;" class="form-control" />
  </div>
  `;
  html +=  `</div>`;


  html +=  `<div id="table-area-${a}-edt">`;

  }


  html +=  `<div style="width: 100%; max-width: 100%; overflow-x: auto;">`;
  html +=  `<table id="${a}" class="table" style="min-width: 100%;">`;
  html +=  `<thead>`;
  html +=  `<tr  class="text-white" style="background-color: #DA251C;">`;
  crudData.headname.forEach((res) => {
    if (res === 'No') {
      html +=  `<th>`;
      html +=  'No';
      html +=  `</th>`;
    }else if(res === 'Harga Total'){
    }else{
      html +=  `<th>`;
      html +=  res;
      html +=  `</th>`;
    }
  });
    if (crudData.editdisabled != undefined) {
    }else{
      html +=  `<th>#</th>`;
    }
  html +=  `</tr>`;
  html +=  `</thead>`;
  html +=  `<tbody>`;


  var numero = 1;
  var dateTerakhir = ``;
  var noTransaksi = 1;
  objk.forEach((item, z) => {
    html +=  `<tr>`;
    var number = 0;
    crudData.table.forEach((res) => {

      if (crudData.headname[number] === 'Tanggal Transaksi') {
        if (dateTerakhir === '') {
          dateTerakhir = eval(`item.${res}`);
        }else{
          if (dateTerakhir === eval(`item.${res}`)) {
            dateTerakhir = eval(`item.${res}`);
          }else{
            dateTerakhir = eval(`item.${res}`);
            noTransaksi += 1;
          }
        }
      }

      var dataO = crudData.listData[number];
      if(dataO != null && dataO != undefined){
        helper.dataO[dataO.table] = crudData.listData[number];
      }

      var id = null;
      var nama = null;
      var table = null;
      if (dataO != null) {
        id = dataO.id;
        nama = dataO.nama;
        table = dataO.table;
      }

      if (crudData.headname[number] === 'No') {
        html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;

        html +=  z + Number(c) + 1;
        html +=  `</td>`;
      }else if (crudData.headname[number] === 'No Bukti Transaksi') {
        html +=  `<td style="min-width:${crudData.width[number]}px; max-width:${crudData.width[number]}px; width:${crudData.width[number]}px;">`;


        html +=  eval(`
          form.${crudData.form[number]}(item.${res}+'-'+noTransaksi, "${res}", "${crudData.tablename}"
          , "${id}", "${nama}", "${table}", "${eval(`item.${crudData.key}`)}", "${crudData.key}", dataO)
          `);
          html +=  `</td>`;

      }else if(crudData.headname[number] === 'Harga Total'){
      }else{
        if (crudData.width[number] != "") {
          if (crudData.form[number] === "select") {
            html +=  `<td style="min-width:${Number(crudData.width[number]) + 90}px; max-width:${Number(crudData.width[number]) + 90}px; width:${Number(crudData.width[number]) + 90}px;">`;
          }else if(crudData.form[number] === "select2") {
            html +=  `<td style="min-width:${Number(crudData.width[number]) + 90}px; max-width:${Number(crudData.width[number]) + 90}px; width:${Number(crudData.width[number]) + 90}px;">`;
          }else{
            if (number === 0) {
              html +=  `<td style="min-width:${Number(crudData.width[number]) + 90}px; max-width:${Number(crudData.width[number]) + 90}px; width:${Number(crudData.width[number]) + 90}px; text-align: center;">`;
            }else{
              html +=  `<td style="min-width:${Number(crudData.width[number]) + 90}px; max-width:${Number(crudData.width[number]) + 90}px; width:${Number(crudData.width[number]) + 90}px;">`;
            }
          }
        }else{
            html +=  `<td style="min-width:; max-width:; width:;">`;
        }


        html +=  eval(`
          form.${crudData.form[number]}(item.${res}, "${res}", "${crudData.tablename}"
          , "${id}", "${nama}", "${table}", "${eval(`item.${crudData.key}`)}", "${crudData.key}",dataO)
          `);
          html +=  `</td>`;

      }

      number++;
    });

    if (crudData.customeButtonViewGo != undefined) {
      if (crudData.editdisabled != undefined) {
      }else{
        html +=  `<td style="min-width: 220px; max-width: 220px; width: 220px;">
          <button nama-table="${a}" crud-view-data-on-hide data-key="${crudData.customeButtonViewData}" data-go="${crudData.customeButtonViewGo}" data-keep="${helper.encryptG(item)}" class="btn" style="background-color: #0066D5; color: white;">Tampilkan</button>
          <button data-page="${c}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" table-name="${crudData.tablename}" data-key="${crudData.key}" crud-data-hapus-duo data-id="${eval(`item.${crudData.key}`)}" class="btn btn-danger">Hapus</button>
        </td>`;
      }
    }else{
      if (crudData.editdisabled != undefined) {
      }else{
        html +=  `<td width="80px"><button data-page="${c}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" table-name="${crudData.tablename}" data-key="${crudData.key}" crud-data-hapus-duo data-id="${eval(`item.${crudData.key}`)}" class="btn btn-danger">Hapus</button></td>`;
      }
    }

    html +=  `</tr>`;
  });

  html +=  `</tbody>`;
  html +=  `</table>`;
  html +=  `</div>`;
  html +=  `<div style="margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto;
  ">`;
  html +=  `
  <div>
    Showing 1 to ${Math.ceil(Number(objkcount / b))} of ${objkcount} entries
  </div>
  <div style="text-align: right;">
    <nav aria-label="Page navigation example" style="display: inline-block;">
      <ul class="pagination">
        <li class="page-item"><a data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-prev-edt class="page-link" href="#">Previous</a></li>
        `;

        for (var i = 0; i < Math.ceil(Number(objkcount) / Number(b)); i++) {
          if (i >= startFrom && i < endOf ) {
            if (i === (Number(c) / Number(b))) {
              html +=  `  <li class="page-item active"><a data-page="${i}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-edt class="page-link" href="#">${Number(i + 1)}</a></li>`
            }else{
              html +=  `  <li class="page-item"><a data-page="${i}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-edt class="page-link" href="#">${Number(i + 1)}</a></li>`
            }
          }
        }

        html += `
        <li class="page-item"><a data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" go-pagin-crud-next-edt class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
  `;
  html +=  `</div>`;


  html +=  `

  <div id="modal-${a}" class="gg-modal">
    <div id="id01" class="gg-modal-container">
    <div class="row">
      <div class="col-sm-12">
        <div class="card relative">
          <div class="card-header">
            <span close-modal master="${c}" data-page="${c}" data-total="${objkcount}" data-pagin-start="${startFrom}" data-pagin-end="${endOf}" data-table="${a}" data-cari="${search}" data-length="${b}" data-start="${c}"  data-orderby="${orderby}" data-orderset="${orderoption}" data-filltable="${filltable}" data-fillnilai="${fillnilai}" data-rowP="${rowP}" class="top-right" style="cursor: pointer;">&times;</span>
            <h2 id="title-modal" style="text-transform:capitalize;"></h2>
          </div>
          <div class="modal-body" id="include-master-data">

          </div>
          <div class="card-footer">
            <p>Modal Footer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

<div class="modal-select" id="select-multiple">
  <div class="body-select" id="select-multiple-body">
  </div>
</div>

  `;


  if (cekTableArea === null) {

    document.querySelector(`#${crudData.domp}`)
    .innerHTML = html;
  }else{
    cekTableArea.innerHTML = html;
  }


  $("body .tanggal").inputmask({mask: "9999-99-99"});


  $("body .select2").select2();

  if(crudData.func != undefined){
    crudData.func();
  }

}
