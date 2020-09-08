async function(){

  await helper.createLocal('data_barang');
  await helper.createLocal('packet');
  await helper.createLocal('packet_barang');


  var dataTypeTransaksi = helper.decryptG(helper.sesiGet('permintaan_sj'));

  crudtransaksi.set("packet",{
    key: "id",
    headname: ['No', 'packet'],
    table: ['id', "packet"],
    form: ["no", "text"],
    customeButtonDataView: true,
    customeButtonViewGo: "#/packet_detail",
    customeButtonViewData: "data-order-saya",
    listData: [
      null,
      null
    ],
    width: ["50", ""],
    domp: 'crud'
  })



    crudtransaksi.set("data_barang",{
      key: "id",
      headname: ['No', 'Nama Barang', 'Jenis Barang', 'Kategori Barang', 'golongan', 'Satuan', 'stok'],
      table: ['id', 'nama_barang', 'status_barang_id', 'status_barang_2_id', 'golongan_barang', 'satuan_id', 'stok'],
      form: ["no", "text", "select", "select", 'select', "select", "text"],
      listData: [
        null,
        null,
        {
            id: 'id',
            nama: 'status_barang',
            table: 'status_barang'
        },
        {
            id: 'id',
            nama: 'status',
            table: 'status_barang_2'
        },
        {
            id: 'id',
            nama: 'kelompok',
            table: 'kelompok_penyusutan'
        },
        {
            id: 'id',
            nama: 'satuan',
            table: 'data_satuan'
        },
         null
        // {
          //   id: 'id',
          //   nama: 'nama',
          //   table: 'akun'
          // }
        ],
        width: ["80", "300", "250", "250", "250", "250", "120"],
        domp: 'crud'
      })

    crudtransaksi.set("tbl_permintaan_sj",{
    key: "id",
    headname: ['No', 'Barang', 'packet', 'jml', 'Harga Satuan'],
    table: ['id', 'data_barang_id', 'packet_id', 'jml', 'bsu'],
    form: ["no", "selectmultiple", 'selectNormal', "text", "rupiah"],
    filter: {
      key: "permintaan_sj_id",
      value: dataTypeTransaksi.id
    },
    dataSend: {
      permintaan_sj_id: dataTypeTransaksi.id
    },
    listData: [
      null,
      {
        id: 'id',
        nama: 'nama_barang',
        table: 'data_barang',
        fill: {
          status_barang: {
            id: 'id',
            nama: 'status_barang',
            target: 'status_barang_id'
          }
        }
      },
      {
        id: 'id',
        nama: 'packet',
        table: 'packet',
        // fill: {
        //   packet: {
        //     id: 'id',
        //     nama: 'packet',
        //     target: 'packet'
        //   }
        // }
        optionMop: {
          table: 'packet_barang',
          dataName: 'data_barang_id',
          dataKey: "packet_id",
          func: function(data){
            data = data.map(function(item){
              return `
                <li class="list-group-item">
                ${helper.optionName(item.data_barang_id, {
                  table: "data_barang",
                  id: "id",
                  nama: "nama_barang"
                })}
                </li>
              `;
            }).join("");
            data = `<div class="modal-data-show">
              <ul class="list-group">
                ${data}
              </ul>
            <div>`;
            $("body").append(data);
          },
          close: function(){
            $("body .modal-data-show").remove();
          }
        }
      },
      null,
      null
      // {
      //   id: 'id',
      //   nama: 'nama',
      //   table: 'akun'
      // }
    ],
    width: ["50", "450", "250", "190", "190"],
    domp: 'crud'
  })

  crudtransaksi.view("tbl_permintaan_sj");

}
