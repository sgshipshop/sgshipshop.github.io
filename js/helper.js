let rate_sgdidr = rate_usdidr = 0;
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

function changePrice(){
    document.getElementById("price1").value = document.getElementById("android_phones").value;
}

function calculatePrice1(){
    prc = document.getElementById("price1").value;
    // console.log(prc);
    if (prc == null || prc == "" || prc == undefined || isNaN(prc) || prc < 0) {
        // alert("HP-nya belum dipilih nih kak :)");
        $(".err_msg1").text("HP-nya belum dipilih nih kak :)");
    }
    else {
        $(".phone_price").text(document.getElementById("android_phones").value + " SGD");
        $(".phone_name").text($("#android_phones option:selected").text());
    
        $(".err_msg1").text("");
        $(".result").fadeIn();

        a = prc * rate_sgdidr;
        document.getElementById("a").innerHTML = formatRupiah(a);
        // console.log("a = " + a);

        b = 76 * rate_sgdidr;
        document.getElementById("b").innerHTML = formatRupiah(b);
        // console.log("b = " + b);

        // hitung pajak
        // Nilai Pabean
        nilai_pabean = a + b;
        // console.log("nilai_pabean = " + nilai_pabean);

        nilai_pabean_usd = nilai_pabean / rate_usdidr;
        // console.log("nilai_pabean_usd = " + nilai_pabean_usd);

        // Bea Masuk (Kalau Nilai Pabean < 1500 USD, 7.5%. Otherwise 0%.)
        bea_masuk = nilai_pabean_usd < 1500 ? nilai_pabean * 0.075 : 0;
        // console.log("bea_masuk = " + bea_masuk);

        //PPn (10% dari Nilai Pabean)
        ppn = nilai_pabean * 0.1;
        // console.log("ppn = " + ppn);

        //PPh (Kalau Nilai Pabean < 1500 USD, 0%. Otherwise 20%.)
        pph = nilai_pabean_usd < 1500 ? 0 : nilai_pabean * 0.2;
        // console.log("pph = " + pph);

        // Custom Handling Fee (Kalau Nilai Pabean < 1500 USD, 165.000. Otherwise 250.000.)
        custom_handling = nilai_pabean_usd < 1500 ? 165000 : 250000;
        // console.log("custom_handling = " + custom_handling);

        c = Math.round(bea_masuk + ppn + pph + custom_handling, 0);
        document.getElementById("c").innerHTML = formatRupiah(c);

        d = 500000;
        document.getElementById("d").innerHTML = formatRupiah(d);

        e = a + b + c + d;
        document.getElementById("e").innerHTML = formatRupiah(e);

        f = Math.ceil(e / 10000) * 10000;
        document.getElementById("f").innerHTML = formatRupiah(f);
    }
}



function calculatePrice2(){
    prc = document.getElementById("price2").value;
    // console.log(prc);
    if (prc == null || prc == "" || prc == undefined || isNaN(prc) || prc < 0) {
        // alert("HP-nya belum dipilih nih kak :)");
        $(".err_msg2").text("Harganya belum dimasukkan nih kak :)");
    }
    else {
        $(".phone_price").text(document.getElementById("price2").value + " SGD");
        $(".phone_name").text("Harga HP yang kakak masukkan");
    
        $(".err_msg2").text("");
        $(".result").fadeIn();

        a = prc * rate_sgdidr;
        document.getElementById("a").innerHTML = formatRupiah(a);
        // console.log("a = " + a);

        b = 76 * rate_sgdidr;
        document.getElementById("b").innerHTML = formatRupiah(b);
        // console.log("b = " + b);

        // hitung pajak
        // Nilai Pabean
        nilai_pabean = a + b;
        // console.log("nilai_pabean = " + nilai_pabean);

        nilai_pabean_usd = nilai_pabean / rate_usdidr;
        // console.log("nilai_pabean_usd = " + nilai_pabean_usd);

        // Bea Masuk (Kalau Nilai Pabean < 1500 USD, 7.5%. Otherwise 0%.)
        bea_masuk = nilai_pabean_usd < 1500 ? nilai_pabean * 0.075 : 0;
        // console.log("bea_masuk = " + bea_masuk);

        //PPn (10% dari Nilai Pabean)
        ppn = nilai_pabean * 0.1;
        // console.log("ppn = " + ppn);

        //PPh (Kalau Nilai Pabean < 1500 USD, 0%. Otherwise 20%.)
        pph = nilai_pabean_usd < 1500 ? 0 : nilai_pabean * 0.2;
        // console.log("pph = " + pph);

        // Custom Handling Fee (Kalau Nilai Pabean < 1500 USD, 165.000. Otherwise 250.000.)
        custom_handling = nilai_pabean_usd < 1500 ? 165000 : 250000;
        // console.log("custom_handling = " + custom_handling);

        c = Math.round(bea_masuk + ppn + pph + custom_handling, 0);
        document.getElementById("c").innerHTML = formatRupiah(c);

        d = 500000;
        document.getElementById("d").innerHTML = formatRupiah(d);

        e = a + b + c + d;
        document.getElementById("e").innerHTML = formatRupiah(e);

        f = Math.ceil(e / 10000) * 10000;
        document.getElementById("f").innerHTML = formatRupiah(f);
    }
}