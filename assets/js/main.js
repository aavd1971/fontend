$(function(){

    var Article = {
        name: 'Article',
        items: [
            {
                name: "item1",
                params: {Description: "d1",UnitPrice: 1,Quantity: 2,TotalPrice: 2,VAT: 5,VATAmount: 0.1,Total: 2.1}
            },
            {
                name: "item2",
                params: {Description: "d2",UnitPrice: 10,Quantity: 20,TotalPrice: 200,VAT: 5,VATAmount: 60,Total: 260}
            },
        ]
    };

    var Company = {
        name: 'Company',
        items: [
            {
                name: "item1",
                params: {Name: "c1",Adress: 'a1',City: 'ci1',PostalCode: 1,VAT: 2,FiscalCode: 3}
            },
            {
                name: "item2",
                params: {Name: "c2",Adress: 'a2',City: 'ci2',PostalCode: 10,VAT: 20,FiscalCode: 30}
            },
        ]
    };

    var Client = {
        name: 'Client',
            items: [
            {
                name: "item1",
                params: {Name: "c1",Adress: 'a1',City: 'ci1',PostalCode: 1,VAT: 2,FiscalCode: 3}
            },
            {
                name: "item2",
                params: {Name: "c2",Adress: 'a2',City: 'ci2',PostalCode: 10,VAT: 20,FiscalCode: 30}
            },
        ]
    };

    (function(){
        setOption(Company);
        setOption(Client);
        setOption(Article);
    })();

    function setOption(obj){
        var str = '';
        obj.items.forEach(function(e,i){
            str += '<option name="' + e.name + '">' + e.name + '</option>'
        })
        $('select#' + obj.name).append(str);
    }

//    $('#formMain,#formModal').validator();
    $('form').validator();

    $('#formMain select').on('change',function(e){
        e.preventDefault();
        var select = $(this).val();
        var obj = ($(this).attr('id') === 'Company') ? Company : Client;
        obj.items.forEach(function(e,i){
            if(e.name === select){
                setValue(e.params,obj.name);
            }
        })
        function setValue(param1,param2){
            var formMain = $('#formMain');
            param2 = (param2 === 'Company') ? '' : param2;
            var Description = formMain.find('[name="Name' + param2 + '"]').val(param1.Name);
            var UnitPrice = formMain.find('[name="Adress' + param2 + '"]').val(param1.Adress);
            var Quantity = formMain.find('[name="City' + param2 + '"]').val(param1.City);
            var TotalPrice = formMain.find('[name="PostalCode' + param2 + '"]').val(param1.PostalCode);
            var VAT = formMain.find('[name="VAT' + param2 + '"]').val(param1.VAT);
            var VATAmount = formMain.find('[name="FiscalCode' + param2 + '"]').val(param1.FiscalCode);
        }
    });

    $('#Load').on('click',function(e){
        e.preventDefault();
        var select = $('select#Article').val();
        Article.items.forEach(function(e,i){
            if(e.name === select){
                setValue(e.params);
            }
        })
        function setValue(params){
            var formModal = $('#formModal');
            var Description = formModal.find('[name="Description"]').val(params.Description);
            var UnitPrice = formModal.find('[name="UnitPrice"]').val(params.UnitPrice);
            var Quantity = formModal.find('[name="Quantity"]').val(params.Quantity);
            var TotalPrice = formModal.find('[name="TotalPrice"]').val(params.TotalPrice);
            var VAT = formModal.find('[name="VAT"]').val(params.VAT);
            var VATAmount = formModal.find('[name="VATAmount"]').val(params.VATAmount);
            var Total = formModal.find('[name="Total"]').val(params.Total);
        }
    });

    $('#formMain').delegate('input','change',function(){
        var tr = $(this).closest('tr');
        var UnitPrice = tr.find('[name="UnitPrice[]"]').val() || 0;
        var Quantity = tr.find('[name="Quantity[]"]').val() || 0;
        var VAT = tr.find('[name="VAT[]"]').val() || 0;
        var TotalPrice = UnitPrice * Quantity;
        var VATAmount = TotalPrice * VAT / 100;
        var Total = TotalPrice + VATAmount;
        tr.find('[name="TotalPrice[]"]').val(parseFloat(TotalPrice).toFixed(2));
        tr.find('[name="VATAmount[]"]').val(parseFloat(VATAmount).toFixed(2));
        tr.find('[name="Total[]"]').val(parseFloat(Total).toFixed(2));
        sumTotal();
    });

    $('#formModal input').on('change',function(){
        var formModal = $('#formModal');
        var UnitPrice = formModal.find('[name="UnitPrice"]').val() || 0;
        var Quantity = formModal.find('[name="Quantity"]').val() || 0;
        var VAT = formModal.find('[name="VAT"]').val() || 0;
        var TotalPrice = UnitPrice * Quantity;
        var VATAmount = TotalPrice * VAT / 100;
        var Total = TotalPrice + VATAmount;
        formModal.find('[name="TotalPrice"]').val(parseFloat(TotalPrice).toFixed(2));
        formModal.find('[name="VATAmount"]').val(parseFloat(VATAmount).toFixed(2));
        formModal.find('[name="Total"]').val(parseFloat(Total).toFixed(2));
    });

    $('#AddNewRow').on('click',function(e){
        var formModal = $('#formModal');
        var Description = formModal.find('[name="Description"]').val('');
        var UnitPrice = formModal.find('[name="UnitPrice"]').val('');
        var Quantity = formModal.find('[name="Quantity"]').val('');
        var TotalPrice = formModal.find('[name="TotalPrice"]').val('0.0');
        var VAT = formModal.find('[name="VAT"]').val('');
        var VATAmount = formModal.find('[name="VATAmount"]').val('0.0');
        var Total = formModal.find('[name="Total"]').val('0.0');
        e.preventDefault();
        $('#myModal').modal('show');
    });

    $('#recordList').delegate('.removeRow','click',function(e){
        e.preventDefault();
        $(this).closest('tr').remove();
        sumTotal();
    });

    $('#Send').on('click',function(e){
//        e.preventDefault();
        var that = $(this);
        var form = that.closest('form');
        var ar = form.serializeArray();
        console.log('ar:',ar);

    });
    $('#Add').on('click',function(e){
        e.preventDefault();
            temp_render();
            sumTotal();
            $('#cancel').click();
    });
    function sumTotal(){
        var formMain = $('#formMain');
        var sumTotal = formMain.find('[name="Total[]"]');
        var s = 0;
        sumTotal.each(function(i,e){
            s += parseFloat($(e).val());
        })
        $('#inputTotal').val(s.toFixed(2));
    }
    function temp_render(){
        var recordList = $('#recordList');
        var formModal = $('#formModal');
        var Description = formModal.find('[name="Description"]').val();
        var UnitPrice = formModal.find('[name="UnitPrice"]').val();
        var Quantity = formModal.find('[name="Quantity"]').val();
        var TotalPrice = formModal.find('[name="TotalPrice"]').val();
        var VAT = formModal.find('[name="VAT"]').val();
        var VATAmount = formModal.find('[name="VATAmount"]').val();
        var Total = formModal.find('[name="Total"]').val();
        var ar = {Description: Description,UnitPrice: UnitPrice,Quantity: Quantity,TotalPrice: TotalPrice,VAT: VAT,VATAmount: VATAmount,Total: Total};
        var template = $('#tempRecordRow').html();
        var rendered = Mustache.render(template, ar);
        recordList.find('tbody').append(rendered);
    }

});