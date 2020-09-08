async function(tahun = '', bulan = ''){

  await helper.createLocal('status_barang')
    await helper.createLocal('status_barang_2')
    await helper.createLocal('kelompok_penyusutan')
    await helper.createLocal('data_satuan')
    await helper.createLocal('akun_khusus')
    await helper.createLocal('data_vendor')
    await helper.createLocal('supplier')
    await helper.createLocal('customer')



  var selectN = helper.yearChoice(10, ` pilih-tahun style="max-width:200px; display:inline-block;"`, 'form-control select2');

  var bulanPilih = helper.monthChoice(` pilih-bulan style="max-width:200px; display:inline-block;"`, 'form-control select2');

  if (bulan != '') {
    bulanPilih = helper.monthChoice(
      ` pilih-bulan style="max-width:200px; display:inline-block;"`
      , 'form-control select2'
      , bulan);
  }

  $(document).ready(function(){
    $('[pilih-bulan]').change(delay(function(){
      var nilai = $(this).val();
      console.log(nilai);
      location.href = `#/marketing-3/${tahun}/${nilai}`;
    }, 100))
  })

  $("body #tahun-choice").html(selectN+bulanPilih)

  if (tahun === '') {
    tahun = helper.sesiGet('tahun');
  }

  if (bulan === '') {
    bulan = helper.sesiGet('bulan');
  }

  var data = `
  {
    "key":"id",
    "headname":["No","No Surat Jalan","Customer","U/p","No Telp","tanggl Permintaan","tanggl Surat Jalan","Diskon","keterangan"]
    ,"table":["id","no_permintaan","customer_id","up","telp","tanggal_permintaan","date","diskon","keterangan"]
    ,"form":["no","text","select","text","text","tanggal","tanggal","number","text"]
    ,"customeButtonDataView":true,
    "customeButtonDataPrint":"#/print/data/sj"
    ,"customeButtonViewGo":"#/permintaan_sj"
    ,"customeButtonViewData":"permintaan_sj"
    ,"filter":{"key":"data_set","value":"sj"}
    ,"filter2":{"key":"logistik_approve","value":"2"}
    ,"filter3":{"key":"tanggal_permintaan","value":"${tahun}-${bulan}"}
    ,"dataSend":{"data_set":"sj","tanggal_permintaan":"${tahun}-${bulan}"}
    ,"orderdefault":"no_permintaan"
    ,"orderset":"ASC"
    ,"listData":[null,null,{"id":"id","nama":"nama","table":"customer"},null,null,null,null,null,null]
    ,"width":["50","180","300","150","150","150","190", 180,280]
    ,"domp":"crud"
    ,"tablename":"permintaan_sj"}`;

  data = JSON.parse(data);

  console.log(data);

  crudtransaksi.set("permintaan_sj", data);
  //
  crudtransaksi.view("permintaan_sj");
}
