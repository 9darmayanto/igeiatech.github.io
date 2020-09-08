function(a){



  let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-order'));

  console.log(dataTypeTransaksi);

  crudtransaksi.set("data_barang",{
    key: "id",
    headname: ['No', 'Nama Barang', 'Jenis Barang', 'Kategori Barang', 'golongan', 'Satuan'],
    table: ['id', 'nama_barang', 'status_barang_id', 'status_barang_2_id', 'golongan_barang', 'satuan_id'],
    form: ["no", "text", "select", "select", 'select', "select"],
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
      }
      // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["80", "300", "250", "250", "250", "250"],
      domp: 'crud'
    })

  crudtransaksi.set("tbl_form_order",{
    key: "id",
    headname: ['No', 'Barang', 'jml'],
    table: ['id', 'data_barang_id', 'jml'],
    form: ["no", "selectmultiple", "text"],
    filter: {
      key: "form_order_id",
      value: dataTypeTransaksi.id
    },
    dataSend: {
      form_order_id: dataTypeTransaksi.id
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
      null
      // {
      //   id: 'id',
      //   nama: 'nama',
      //   table: 'akun'
      // }
    ],
    width: ["50px", "", ""],
    domp: 'crud'
  })

  crudtransaksi.view("tbl_form_order");







}
