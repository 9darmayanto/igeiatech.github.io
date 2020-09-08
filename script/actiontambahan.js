$('[pilih-bulan]').change(delay(function(){
  var nilai = $(this).val();
  console.log(nilai);
  location.href = `#/marketing/${tahun}/${nilai}`;
}, 100))
