var form = {};

form.no = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  return `
    <span>
      ${a}
    </span>
  `;
}
form.noselect = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var data = {
    table: f,
    id: d,
    nama: e
  }
  return `
    <span>
      ${helper.optionName(a, data)}
    </span>
  `;
}

form.text = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var value = a;
  if (value === null) {
    value = "";
  }
  return `
    <input data-id="${g}" type="text" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${helper.escapeHtml(value)}" />
  `;
}

form.rupiah = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var value = a;
  if (value === null) {
    value = "";
  }
  return `
    <input data-id="${g}" type="rupiah" class="form-control rupiah" data-key="${h}" style="text-align: right;" crud-table-update-data table-name="${c}" data-row="${b}" value="${helper.formatRupiah(value)}" />
  `;
}

form.number = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var value = a;
  if (value === null) {
    value = "";
  }
  return `
    <input data-id="${g}" type="number" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
  `;
}

form.tanggal = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var value = a;
  if (value === null) {
    value = "";
  }
  return `
    <input data-id="${g}" type="date" class="form-control tanggal" data-key="${h}" crud-table-update-data table-name="${c}" placeholder="yyyy-mm-dd" data-row="${b}" value="${value}" />
  `;
}

form.select = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var data = {
    id: d,
    nama: e
  }
  return `
    <select data-id="${g}" type="number" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
      ${helper.option(f, a, data)}
    </select>
    <button modal-show-data table-name="${c}" table-show="${f}">+</button>
  `;
}

form.selectNormal = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null, w){
  var data = {
    id: d,
    nama: e
  }
  return `
  <div class="select3-form">
    <select data-id="${g}" type="number" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data table-name="${c}" id="${c}" data-row="${b}" class="select3">
    ${helper.option(f, a, data, `show-list="${f}"`, w)}
    </select>
    <button modal-show-data table-name="${c}" table-show="${f}">+</button>
  </div>
  `;
}

form.select2 = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var data = {
    id: d,
    nama: e
  }
  return `
    <select data-id="${g}" type="number" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data table-name="${c}" data-row="${b}" class="">
      ${helper.option(f, a, data)}
    </select>
    <button modal-show-data table-name="${c}" table-show="${f}">+</button>
  `;
}

form.selectmultiple = (a, b = null, c = null, d = null, e = null, f = null, g = null, h = null) => {
  var data = {
    table: f,
    id: d,
    nama: e
  }
  return `
    <input style="float:left; width: calc(100% - 50px);" data-f="${f}" table-show="${f}" data-a="${a}" data-select="${helper.encryptG(data)}" data-id="${g}" type="text" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data-multi table-name="${c}" data-row="${b}" class="form-control" value="${helper.optionName(a, data)}"/>
    <button modal-show-data table-name="${c}" table-show="${f}">+</button>
  `;
}

form.percent = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
  var value = a;
  if (value === null) {
    value = "";
  }

  var opsi = ``;

  for (var i = 1; i <= 100; i++) {
    if (value == i) {
      opsi += `<option selected value="${i}">${i} %</option>`;
    }else{
      opsi += `<option value="${i}">${i} %</option>`;
    }
  }

  return `
    <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
      ${opsi}
    </select>
  `;

}

form.ppn = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){

  var value = a;
  if (value === null) {
    value = "";
  }

  var opsi = ``;

  var ppn = [0,10]

  for (var i = 0; i < ppn.length ; i++) {
    if (value == ppn[i]) {
      opsi += `<option selected value="${ppn[i]}"> ${ppn[i]} %</option>`;
    }else{
      opsi += `<option value="${ppn[i]}">${ppn[i]} %</option>`;
    }
  }

  return `
    <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
      ${opsi}
    </select>
  `;
}
