function SaludaWey() {
    alert("hola chew");
    console.log("hola chew consoleishon");
}

function LoadJson() {
    fetch("./dato.json")
        .then(response => {            
            return response.json();                        
        })
        .then(function(jsondata){
          let jsonPrincipal = jsondata;
          console.log( jsonPrincipal);
          //Inicio de configuración DataTAble    
    $('#gridContainer').dxDataGrid({
        dataSource: jsonPrincipal[0].ConsumoMp,
        keyExpr: 'barco',
        showBorders: true,
        wordWrapEnabled: true,
        export: {
            enabled: true,
        },
        onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('CountriesPopulation');
    
            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet,
                topLeftCell: { row: 8, column: 1 },
            }).then((cellRange) => {
                // header 
                const headerRow = worksheet.getRow(2);
                headerRow.height = 30;
                worksheet.mergeCells(2, 1, 2, 13);
    
                headerRow.getCell(1).value = 'HOJA DE CONTROL DE MOVIMIENTO DE PRODUCTOS PESQUEROS DESTINADOS A LAS EXPORTACIONES BAJO EL SISTEMA EUR1';
                headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
                headerRow.getCell(1).alignment = { horizontal: 'center' };
                headerRow.getCell(1).font = { color: { argb: '000000' }, italic: true };
    
                worksheet.getRow(4).value = 'EMPRESA:            ASISERVY S. A.';
                worksheet.getRow(4).font = { name: 'Segoe UI Light', size: 14 };
                worksheet.getRow(4).alignment = { horizontal: 'center' };
                worksheet.getRow(4).font = { color: { argb: '000000' }, italic: true };
    
                worksheet.getCell('A4').value = 'EMPRESA:            ASISERVY S. A.';
                worksheet.getCell('A4').style.alignment = { horizontal: 'left', vertical: 'middle' };
                worksheet.mergeCells('A4:M4');
    
                worksheet.getCell('A5').value = 'REP. LEGAL:        GUSTAVO NUÑEZ';
                worksheet.getCell('A5').style.alignment = { horizontal: 'left', vertical: 'middle' };
                worksheet.mergeCells('A5:F5');
                worksheet.getCell('G5').value = 'FACTURA Nº :   ' + jsonPrincipal[0].factura;
                worksheet.getCell('G5').style.alignment = { horizontal: 'left', vertical: 'middle' };
                worksheet.mergeCells('G5:M5');
    
                worksheet.getCell('A6').value = 'PESO BRUTO:   ' + jsonPrincipal[0].PesoBruto + ' KG';
                worksheet.getCell('A6').style.alignment = { horizontal: 'left', vertical: 'middle' };
                worksheet.mergeCells('A6:M6');
    
    
                // footer 
                const footerRowIndex = cellRange.to.row + 2;
                const footerRow = worksheet.getRow(footerRowIndex);
                worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
    
                footerRow.getCell(1).value = '"Declaramos  bajo juramento que los datos aquí consignados son verdaderos y corresponde a la exportación antes descrita."';
                footerRow.getCell(1).font = { color: { argb: '000000' }, italic: true };
                footerRow.getCell(1).alignment = { horizontal: 'left' };
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "FACT. " + jsonPrincipal[0].factura + ".xlsx");
                });
            });
            e.cancel = true;
        },
    
    
    
        columnFixing: { enabled: true },
        summary: {
            totalItems: [
                {
                    column: "MPUtilizada",
                    summaryType: 'sum',
                    customizeText(data) {
                        return data.value
                    },
                }, {
                    column: "pesoCarne",
                    summaryType: 'sum',
                    customizeText(data) {
                        return data.value
                    },
                }, {
                    column: "pesoNetoKG",
                    summaryType: 'sum',
                    customizeText(data) {
                        return data.value
                    },
                }
            ]
        },
    
        columns: [
            {
                caption: 'ORGIEN DE LA MATERIA PRIMA ',
    
                columns: [{
                    caption: 'NOMBRE DE LA EMBARCACIÓN',
                    dataField: 'barco',
                    sortOrder: 'desc',
                    width: 130,
                    fixed: true
    
                }, {
                    caption: 'VIAJE Nº',
                    dataField: 'Marea',
                    width: 30
                }, {
                    caption: 'Nº DE REGISTRO O COMPROBANTE',
                    dataField: 'nComprobante',
                    width: 100
                }, {
                    caption: 'CÓDIGO DE REGISTRO DE CAPTURA DE LA PESCA',
                    dataField: 'nCaptura',
                    width: 100
                }, {
                    caption: 'INGRESO APLANTA',
                    columns: [{
                        caption: 'CANTIDAD (KN)',
                        dataField: 'cantidad',
                        width: 90
                    }, {
                        caption: 'FECHA',
                        dataField: 'fechaIngresoMP',
                        width: 90
                    }],
                },
                ],
            },
            {
                caption: 'CONTROL DE LA PRODUCCIÓN OBTENIDA ',
    
                columns: [{
                    caption: 'MATERIA PRIMA UTILIZADO',
                    dataField: 'MPUtilizada',
                    width: 70
                }, {
                    caption: 'ESPECIE',
                    dataField: 'especie',
                    width: 60
                }, {
                    caption: 'CODIGO',
                    dataField: 'Codigo',
                    width: 70
                }, {
                    caption: 'DIAS DE PRODUCCION',
                    dataField: 'fechaProduccion',
                    width: 90
                },
                ],
            }, {
                caption: 'CONTROL DE LAS EXPORTACIONES ',
    
                columns: [{
                    caption: 'PESO DE CARNE',
                    dataField: 'pesoCarne',
                    width: 70
                }, {
                    caption: 'DESCRIPCION DEL PRODUCTO',
                    dataField: 'descripcionProducto',
                    width: 230
                }, {
                    caption: 'PESO NETO KG',
                    dataField: 'pesoNetoKG',
                    width: 70
                },
                ],
            }],
         });
         //fin de la tabla

        })
        .catch(function(){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
                footer: '<label>Error al abrir el archivo especificado</label>'
              })
        });
    
    /*
    

    */
    
}