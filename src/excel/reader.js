import XLSX from 'xlsx';


export const readExcel = file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});

      console.log(workbook.SheetNames);
   
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(file);
}
