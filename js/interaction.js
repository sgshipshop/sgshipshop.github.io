$(document).ready(function(){
    function formatRupiah (num){
        num_string = num.toString(),
        sisa 	= num_string.length % 3,
        rupiah 	= num_string.substr(0, sisa),
        ribuan 	= num_string.substr(sisa).match(/\d{3}/g);
            
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return "Rp" + rupiah;
    }

    // get SGD to IDR rate
    fetch("https://currency-exchange.p.rapidapi.com/exchange?from=SGD&to=IDR&q=1.0", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": "b0fcb07fd8mshe7bb5932c2718a3p1c07a0jsnd1e84edd8c4e"
        }
    })
    .then(response => {
        response.json().then( res => {
            rate_sgdidr = Math.ceil(res*1.05 / 100) * 100;
            document.getElementById("rate_sgdidr").innerHTML = formatRupiah(rate_sgdidr);
        })
        .catch(err => {
            console.error(err);    
        })
    })
    .catch(err => {
        console.error(err);
    });

    // get USD to IDR rate
    fetch("https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=IDR&q=1.0", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": "b0fcb07fd8mshe7bb5932c2718a3p1c07a0jsnd1e84edd8c4e"
        }
    })
    .then(response => {
        response.json().then( res => {
            rate_usdidr = Math.ceil(res / 100) * 100;
            document.getElementById("rate_usdidr").innerHTML = formatRupiah(rate_usdidr);
        })
        .catch(err => {
            console.error(err);    
        })
    })
    .catch(err => {
        console.error(err);
    });

    $('#successAlert').hide();
    // $('#alert').alert('close');
    // copy clipboard
    const txt = document.querySelector('#detailHarga');
    const btn = document.querySelector('#copyBtn');

    const copy = (text) => {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = text;
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    }

    btn.addEventListener('click', (e) => {
        if (txt.value != ""){
            copy(txt.value);
            $('#successAlert').show();
            setTimeout(function () {
                $('#successAlert').hide();
            }, 2000);
        }
    });

    $("#generateHarga").click(function(){
        selectedJenisBarangId = document.getElementById("jenisBarang").value;
        hargaBarang = document.getElementById("hargaBarang").value;

        beratTimbangan = document.getElementById("beratTimbangan").value;
        beratVolumetrik = 0;
        p = document.getElementById("dimensiPaketP").value;
        l = document.getElementById("dimensiPaketL").value;
        t = document.getElementById("dimensiPaketT").value;
        beratDigunakan = 0;

        // dapetin ongkir
        ongkirObj = {};
        for (i = 0; i < ongkir.length; i++) {
            if (selectedJenisBarangId == ongkir[i]["id"]) {
                ongkirObj = ongkir[i];
                break;
            }
        }
        // console.log(ongkirObj);

        // hitung harga
        if (isNaN(hargaBarang) || hargaBarang == "" || hargaBarang <= 0) {
            hargaBarang = 0;
        }
        hargaBarang = hargaBarang * rate_sgdidr;
        hargaBarang = Math.ceil(hargaBarang / 10000) * 10000;

        // ongkos jastip
        ongkosJastip = 0;
        if (hargaBarang < 1500000) {
            ongkosJastip = 200000;
        }
        else if(hargaBarang < 2500000) {
            ongkosJastip = 350000;
        }
        else {
            ongkosJastip = 500000;
        }

        // hitung berat
        // berat timbangan
        if (isNaN(beratTimbangan) || beratTimbangan == "" || beratTimbangan <= 0) {
            beratTimbangan = 0;
        }

        // berat volumetrik
        if (!isNaN(p) & !isNaN(l) && !isNaN(t) &&
            p != "" && l != "" || t != "" &&
            p > 0 && l > 0 && t > 0) {
            beratVolumetrik = p * l * t / 6000
        }
        else{
            beratVolumetrik = 0;
        }

        beratDigunakan = (beratTimbangan > beratVolumetrik) ? beratTimbangan : beratVolumetrik;
        beratDigunakan = Math.round(beratDigunakan);

        totalOngkir = beratDigunakan * ongkirObj["ongkir_per_kg"];

        if (ongkirObj["threshold_additional_charge"]) {
            // if exist
            if (hargaBarang > ongkirObj["threshold_additional_charge"]) {
                totalOngkir += ongkirObj["additional_charge"];
            }
        }

        text = "berikut rinciannya kak :)" +
                "\nharga barang = " + formatRupiah(hargaBarang) +
                "\nongkos jastip = " + formatRupiah(ongkosJastip) +
                "\nongkos kirim (estimasi " + beratDigunakan + "kg) = " + formatRupiah(totalOngkir) +
                "\nTOTAL = " + formatRupiah(hargaBarang + ongkosJastip + totalOngkir);

        txt.value = text;

        var el = txt;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    });
});