var bookDomain = "book.easytablebooking.com",
    bookHeader = "",
    bookPlace = "",
    bookLang = "",
    bookDest = "",
    bookSettings = "",
    bookDate = "",
    bookPersons = "",
    bookTime = "",
    bookPhone = "",
    bookName = "",
    bookEmail = "",
    bookZip = "",
    bookNyhedsbrev = "",
    bookComment = "",
    cancelPhone = "",
    bookingType = "",
    bookingTypeText = "",
    bookShowDuration = 0,
    bookConfirmDuration = 0,
    bookDuration = "",
    bookCancelID = "",
    bookCancelMobile = "",
    bookRef = "",
    bookInfo = "",
    bookInfoConfirm = 0,
    bookDeposit = "",
    bookPrepay = "",
    bookCurrency = "",
    availableDates, unavailableDates, head = document.getElementsByTagName("head")[0],
    insertJQuery = !1;
if ("undefined" == typeof jQuery ? insertJQuery = !0 : "1.7.1" != jQuery().jquery && "1.9.0" != jQuery().jquery || (insertJQuery = !0), insertJQuery) {
    var st = document.createElement("script");
    st.type = "text/javascript", st.src = "//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js", head.appendChild(st, head)
}
var st = document.createElement("link");
st.rel = "stylesheet", st.href = "//" + bookDomain + "/styles/widget/v2/default.min.css?v=9", st.type = "text/css", head.appendChild(st, head);
var st = document.createElement("link");
st.rel = "stylesheet", st.href = "//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700", st.type = "text/css", head.appendChild(st, head);
var st = document.createElement("link");
st.rel = "stylesheet", st.href = "//" + bookDomain + "/javascripts/widget/jquery-ui-1.11.4/jquery-ui.min.css", st.type = "text/css", head.appendChild(st, head);
var st = document.createElement("link");

function availableCheck(o) {
    var e = o.getDate() + "-" + (o.getMonth() + 1) + "-" + o.getFullYear();
    return -1 != jQuery.inArray(e, unavailableDates) ? [!0, "SoldOut", ""] : -1 != jQuery.inArray(e, availableDates) ? [!0, "", ""] : [!1, "", ""]
}

function runJQuery() {
    "undefined" != typeof jQuery ? jQuery(function() {
        jQuery(".BookingBoxContent").html('<div style="text-align: center;"><img src="//' + bookDomain + '/graphics/ajax-loader.gif" border="0" /></div>'), jQuery("head").append('<script src="//' + bookDomain + '/javascripts/widget/jquery-ui-1.11.4/jquery-ui.min.js"><\/script>'), void 0 === jQuery().intlTelInput && jQuery("head").append('<script src="//' + bookDomain + '/javascripts/intlTelInput14.0.6/js/intlTelInput-jquery.min.js"><\/script>'), jQuery(".BookingBox").each(function() {
            bookPlace = jQuery(this).attr("placeid"), bookLang = jQuery(this).attr("language"), bookCancelID = jQuery(this).attr("cancelid"), bookCancelMobile = jQuery(this).attr("cancelmobile"), bookRef = jQuery(this).attr("ref"), bookDate = jQuery(this).attr("date"), bookingType = jQuery(this).attr("type"), "" == bookPlace || void 0 === bookPlace ? console.log("Error: placeid missing!") : (bookDest = jQuery(".BookingBoxContent", this), loadWidget())
        }), jQuery(".ShowBooking").click(function() {
            bookPlace = jQuery(this).attr("placeid"), bookLang = jQuery(this).attr("language"), bookRef = jQuery(this).attr("ref"), bookDate = jQuery(this).attr("date"), bookingType = jQuery(this).attr("type"), "" == bookPlace || void 0 === bookPlace ? console.log("Error: placeid missing!") : loadWidget()
        }), jQuery("a[href^='https://book.easytablebooking.com/book/?']").click(function(o) {
            o.preventDefault(), bookPlace = getQueryString(jQuery(this).attr("href"), "id"), bookLang = getQueryString(jQuery(this).attr("href"), "lang"), bookRef = getQueryString(jQuery(this).attr("href"), "ref"), bookDate = getQueryString(jQuery(this).attr("href"), "date"), bookingType = getQueryString(jQuery(this).attr("href"), "type"), "" == bookPlace || void 0 === bookPlace ? console.log("Error: placeid missing!") : loadWidget()
        }), sizeCheck(), jQuery(window).on("resize", function() {
            sizeCheck()
        })
    }) : setTimeout("runJQuery();", 50)
}

function changeType() {
    "" == (bookingType = jQuery("#BookingType").val()) || "0" == bookingType ? (availableDates = [], bookingTypeText = "", jQuery("#divTimes").html(""), jQuery("#divTimes").hide(300), jQuery(".rowKalender").hide(300)) : (bookingTypeText = jQuery("#BookingType option:selected").text(), jQuery.each(bookSettings.BookingTypes, function(o, e) {
                e.ID != bookingType || (availableDates = JSON.parse(e.AvailableDates))
            }), GetTimes()), jQuery("#BookingKalender").etb_datepicker("refresh"), jQuery("#BookingKalender .etb-datepicker").show()
}

function loadWidget() {
    void 0 === bookDate && (bookDate = ""), void 0 === bookingType && (bookingType = ""), jQuery.ajax({
            dataType: "jsonp",
            url: "//" + bookDomain + "/user/ajax/json_frontend_booking_widget_data.asp",
            data: "place=" + bookPlace + "&lang=" + bookLang,
            success: function(o) {
                bookHeader = '<div class="title"><span class="close" onclick="closePopup();">&#10006;</span>' + (bookSettings = o).Text.booking_title + "</div>", null != bookSettings.Settings[0].CSS && (jQuery("link[href='//" + bookDomain + "/styles/widget/" + bookSettings.Settings[0].CSS + "']").length || jQuery('<link rel="stylesheet" href="//' + bookDomain + "/styles/widget/" + bookSettings.Settings[0].CSS + '">').appendTo("head")), "" == bookDest && (jQuery("html").addClass("etpPopup"), 0 == jQuery("#BookingBackground").length && jQuery("body").append('<div id="BookingBackground"><div id="BookingPopup"><div class="BookingBoxContent"></div></div><div style="text-align: center;">' + bookSettings.Text.in_cooperation_with + '<br /><a href="' + bookSettings.Text.site_url + '" target="_blank"><img src="//' + bookDomain + '/graphics/logo.png" border="0" alt="easyTableBooking" style="width: 160px; margin-top: 2px; margin-left: auto; margin-right: auto;"></a></div></div>'), jQuery(".BookingBoxContent").html('<div style="text-align: center;"><img src="//' + bookDomain + '/graphics/ajax-loader.gif" border="0" /></div>'), jQuery("#BookingBackground").fadeIn(500, function() {
                            scrollToBooking()
                        }), bookDest = jQuery(".BookingBoxContent")), "" != bookCancelID && void 0 !== bookCancelID && "" != bookCancelMobile && void 0 !== bookCancelMobile ? showCancel() : (showStep1(), "" != bookDate && "" != bookPersons ? (jQuery("#BookingKalender").etb_datepicker("setDate", bookDate), jQuery("#BookingPersoner").val(bookPersons), GetTimes()) : "" != bookDate && (jQuery("#BookingKalender").etb_datepicker("setDate", bookDate), GetDayNote()), "" != bookingType && (jQuery("#BookingType").val(bookingType), changeType()))
            },
            jsonp: "jsonp"
        })
}

function showStep1() {
    if (void 0 !== jQuery().etb_datepicker && void 0 !== jQuery().intlTelInput) {
        var htmlStep1;
        if (bookSettings.Disabled) htmlStep1 = "<div>" + bookSettings.Text.widget_disabled + "</div>";
        else {
            for (unavailableDates = JSON.parse(bookSettings.Dates.Unavailable), htmlStep1 = '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.place + ':</div><div class="col2"><div class="semibold">' + bookSettings.Settings[0].Navn + "</div>" + bookSettings.Settings[0].Adresse + "</div></div>", 0 < bookSettings.BookingTypesCount ? (htmlStep1 += '<div class="spaceafter"><div class="col1">' + bookSettings.Text.type + ':</div><div class="col2"><select id="BookingType" onchange="changeType();">', 1 < bookSettings.BookingTypesCount ? htmlStep1 += '<option value="0">- ' + bookSettings.Text.select_type + " -</option>" : availableDates = JSON.parse(bookSettings.BookingTypes[0].AvailableDates), jQuery.each(bookSettings.BookingTypes, function(o, e) {
                            1 == bookSettings.BookingTypesCount && (bookingType = e.ID, bookingTypeText = e.Navn), htmlStep1 += '<option value="' + e.ID + '">' + e.Navn + "</option>"
                        }), htmlStep1 += "</select></div></div>") : availableDates = JSON.parse(bookSettings.Dates.Available), htmlStep1 += '<div class="spaceafter"><div class="col1">' + bookSettings.Text.guests + ':</div><div class="col2"><select id="BookingPersoner" size="1" onchange="GetTimes();"><option value=""></option>', i = bookSettings.Settings[0].MinPersoner; i <= bookSettings.Settings[0].MaxPersoner; i++) htmlStep1 += '<option value="' + i + '">' + i + " " + bookSettings.Text.pers + "</option>";
            htmlStep1 += '<option value="0">' + bookSettings.Text.more_than + "</option>", htmlStep1 += "</select>", htmlStep1 += '<br /><div class="maxinfo">' + bookSettings.Text.max_persons + '</div></div></div><div class="spaceafter rowKalender"><div class="col1">' + bookSettings.Text.date + ':</div><div class="col2"><div id="BookingKalender"></div><div class="smalltext">' + bookSettings.Text.max_notice + '</div><div id="divNote" class="info"></div></div></div><div id="divTimes" class="spaceafter"></div>', htmlStep1 += '<div class="spaceafter"><div class="col1 nomargin"></div><div class="col2"><input type="button" value="' + bookSettings.Text.
            continue +'" class="BookSubmit" onclick="ValidateBooking();" /></div></div>', 1 == bookSettings.Settings[0].TilladAnnullering && (htmlStep1 += '<div><div class="col1 nomargin"></div><div class="col2"><span class="link spaceafter-s" onclick="showCancel();">' + bookSettings.Text.cancel_a_reservation + "</span></div></div>")
        }
        jQuery(bookDest).html(bookHeader + htmlStep1), 1 < bookSettings.BookingTypesCount && jQuery(".rowKalender").hide(), scrollToBooking(), eval('jQuery("#BookingKalender").etb_datepicker({beforeShowDay: availableCheck, minDate: -0, onSelect: function() { bookTime = ""; bookDeposit = ""; bookPrepay = ""; GetTimes(); GetDayNote(); },' + bookSettings.Text.calendar_settings + "});"), GetDayNote()
    } else setTimeout("showStep1();", 50)
}

function showCancel() {
    if (1 == bookSettings.Settings[0].TilladAnnullering) var o = '<div class="spaceafter"><span class="link" onclick="showStep1();">' + bookSettings.Text.back + '</span></div><div class="bold spaceafter">' + bookSettings.Text.cancel_a_reservation + '</div><div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.place + ':</div><div class="col2"><div class="semibold">' + bookSettings.Settings[0].Navn + "</div>" + bookSettings.Settings[0].Adresse + '</div></div><div class="spaceafter"><div class="col1">' + bookSettings.Text.mobile + ':</div><div class="col2"><input type="tel" id="BookingMobil" placeholder=" " maxlength="20" autocomplete="tel" /></div></div><div style="margin-bottom: 18px;"><div class="col1 nomargin"></div><div class="col2"><input type="button" value="' + bookSettings.Text.find_booking + '" class="BookSubmit" style="width: 140px; font-weight: normal !important" onclick="GetBookings();" /></div></div><div id="divBookings" class="spaceafter"></div>';
    else o = "<div>" + bookSettings.Text.cancel_not_possible + "</div>";
    jQuery(bookDest).html(bookHeader + o), scrollToBooking(), jQuery("#BookingMobil").intlTelInput({
            nationalMode: !1,
            initialCountry: bookSettings.Settings[0].Landekode
        }), window.intlTelInputGlobals.loadUtils("//" + bookDomain + "/javascripts/intlTelInput14.0.6/js/utils.js"), "" != bookCancelID && void 0 !== bookCancelID && "" != bookCancelMobile && void 0 !== bookCancelMobile && (jQuery("#BookingMobil").intlTelInput("setNumber", bookCancelMobile), GetBookings(bookCancelID))
}

function showAlternatives(o) {
    bookDate = jQuery("#BookingKalender").val(), bookPersons = jQuery("#BookingPersoner").val();
    var e = '<div class="spaceafter"><span class="link" onclick="BackBooking();">' + bookSettings.Text.back + '</span></div><div class="semibold spaceafter">' + bookSettings.Text.alternative_restaurants_select.replace("[place]", bookSettings.Settings[0].Navn).replace("[time]", Klokkeslaet(bookTime)) + '</div><div class="spaceafter">';
    o.each(function(o) {
        e += '<div class="spaceafter-s"><label><input type="radio" value="' + jQuery(this).attr("placeid") + '" name="alternative" />' + jQuery(this).attr("placename") + "</label></div>"
    }), e += "</div>", null != bookSettings.Text.alternative_restaurants_select_part2 && (e += '<div class="spaceafter">' + bookSettings.Text.alternative_restaurants_select_part2 + "</div>"), e += '<div class="spaceafter"><input type="button" value="' + bookSettings.Text.
    continue +'" class="BookSubmit" onclick="ChangePlace();" /></div > <div id="divBookings" class="spaceafter"></div>', jQuery(bookDest).html(bookHeader + e), scrollToBooking()
}

function GetTimes() {
    var o = jQuery("#BookingKalender").val();
    availableCheck(jQuery("#BookingKalender").etb_datepicker("getDate"))[0] || (o = "");
    var e, i, n, a, t = jQuery("#BookingPersoner").val();
    bookSettings.BookingTypesCount <= 1 || "0" != jQuery("#BookingType").val() && "" != t && "0" != t ? jQuery(".rowKalender").show(300) : jQuery(".rowKalender").hide(300), "0" == t ? (jQuery(".maxinfo").show(), jQuery(".rowKalender").hide(300), jQuery(".BookSubmit").hide(300)) : (jQuery(".maxinfo").hide(), jQuery(".BookSubmit").show(300)), "" == o || "0" == t ? (jQuery("#divTimes").html(""), jQuery("#divTimes").hide()) : "" == t && bookSettings.BookingTypesCount <= 1 ? (e = '<div class="col1 nomargin"></div><div class="col2 red semibold">' + bookSettings.Text.persons_missing + "</div>", jQuery("#divTimes").html(e).show(300)) : jQuery.ajax({
            type: "GET",
            url: "//" + bookDomain + "/user/ajax/json_tider_v2.asp",
            data: "place=" + bookPlace + "&date=" + o + "&persons=" + t + "&type=" + bookingType + "&lcid=" + bookSettings.Text.lcid + "&lang=" + bookLang,
            dataType: "jsonp",
            success: function(o) {
                var t = [];
                jQuery.each(o.Tider, function(o, e) {
                    n = i = "", sTitle = "", a = "", void 0 !== e.BookingInfo && (a = e.BookingInfo), 0 == e.Varighed ? (i += " alternative", sTitle = bookSettings.Text.alternative_restaurants, jQuery.each(e.Alternativer, function(o, e) {
                                n += '<span placeid="' + e.ID + '" placename="' + e.Navn + '"></span>'
                            })) : bookTime == e.Minutter && (i += " time_selected", bookDuration = e.Varighed, bookShowDuration = e.OplysVarighed, bookConfirmDuration = e.BekraeftVarighed, bookInfo = a, bookInfoConfirm = e.BookingInfo_Bekraeft, bookDeposit = e.Depositum, bookPrepay = e.Forudbetaling, bookCurrency = e.Valuta), t.push('<span class="time' + i + '" time="' + e.Minutter + '" duration="' + e.Varighed + '" showduration="' + e.OplysVarighed + '" confirmduration="' + e.BekraeftVarighed + '" info="' + a.replace(/"/g, "&quot;
                ") + '" confirminfo="' + e.BookingInfo_Bekraeft + '" title="' + sTitle + '" deposit="' + e.Depositum + '" prepay="' + e.Forudbetaling + '" currency="' + e.Valuta + '">' + n + e.Tid + "</span>")
                }), e = 0 == t.length ? 1 == o.BookingLukket ? '<div class="col1 nomargin"></div><div class="col2 red semibold">' + bookSettings.Text.booking_closed + "</div>" : '<div class="col1 nomargin">' + bookSettings.Text.times + ':</div><div class="col2 red semibold">' + bookSettings.Text.no_times + "</div>" : '<div class="col1">' + bookSettings.Text.times + ':</div><div class="col2">' + t.join("") + "</div>", jQuery("#divTimes").html(e).show(300), TimesAddEvents(), PaymentInfo()
            },
            jsonp: "jsonp"
        })
}

function TimesAddEvents() {
    jQuery("#divTimes .time").click(function() {
        bookTime = jQuery(this).attr("time"), "0" != (bookDuration = jQuery(this).attr("duration")) ? (bookShowDuration = jQuery(this).attr("showduration"), bookConfirmDuration = jQuery(this).attr("confirmduration"), bookInfo = jQuery(this).attr("info"), bookInfoConfirm = jQuery(this).attr("confirminfo"), bookDeposit = jQuery(this).attr("deposit"), bookPrepay = jQuery(this).attr("prepay"), bookCurrency = jQuery(this).attr("currency"), jQuery(".time").removeClass("time_selected"), jQuery(this).addClass("time_selected"), PaymentInfo()) : showAlternatives(jQuery(this).children())
    })
}

function PaymentInfo() {
    var o = "";
    jQuery("#payInfo").hide(500, function() {
        jQuery(this).remove()
    }), "" != bookDeposit ? o = "0,00" == bookDeposit || "0.00" == bookDeposit ? bookSettings.Text.deposit_no_amount : bookSettings.Text.deposit.replace("[amount]", bookDeposit).replace("[currency]", bookCurrency) : "" != bookPrepay && (o = "0,00" == bookPrepay || "0.00" == bookPrepay ? bookSettings.Text.prepayment_no_amount : bookSettings.Text.prepayment.replace("[amount]", bookPrepay).replace("[currency]", bookCurrency)), "" != o && (jQuery("#divTimes").after('<div id="payInfo" class="spaceafter"><div class="col1 nomargin"></div><div class="col2 info">' + o + "</div></div>"), jQuery("#payInfo").show(500))
}

function GetDayNote() {
    var o = jQuery("#BookingKalender").val();
    "" == o ? (jQuery("#divNote").html(""), jQuery("#divNote").hide(500)) : jQuery.ajax({
            type: "GET",
            url: "//" + bookDomain + "/user/ajax/json_daynote.asp",
            data: "place=" + bookPlace + "&date=" + o + "&lcid=" + bookSettings.Text.lcid,
            dataType: "jsonp",
            success: function(o) {
                jQuery.each(o, function(o, e) {
                    "" == e.Note ? jQuery("#divNote").hide(500) : (jQuery("#divNote").html(e.Note), jQuery("#divNote").show(500))
                })
            },
            jsonp: "jsonp"
        })
}

function GetBookings(n) {
    var e;
    "" == (cancelPhone = jQuery("#BookingMobil").val()) ? (jQuery("#divBookings").html(""), jQuery("#divBookings").hide(), jQuery("#BookingMobil").focus()) : jQuery.ajax({
            type: "GET",
            url: "//" + bookDomain + "/user/ajax/json_bookings_by_phone.asp",
            data: "place=" + bookPlace + "&mobile=" + encodeURIComponent(cancelPhone) + "&lcid=" + bookSettings.Text.lcid,
            dataType: "jsonp",
            success: function(o) {
                var i = [];
                jQuery.each(o, function(o, e) {
                    if (n == e.BookingID) var t = ' checked="checked"';
                    else t = "";
                    i.push('<div class="spaceafter-s"><label><input type="radio" value="' + e.BookingID + '" name="cancelBooking"' + t + " />" + e.Dato + " " + bookSettings.Text.time_at + " " + e.Tid + ", " + e.Personer + " " + bookSettings.Text.pers + "</label></div>")
                }), e = 0 == i.length ? '<div class="col1 spaceafter-s">' + bookSettings.Text.choose_booking + ':</div><div class="col2 red semibold">' + bookSettings.Text.no_bookings + "</div>" : '<div class="col1 spaceafter-s">' + bookSettings.Text.choose_booking + ':</div><div class="col2"><div class="spaceafter">' + i.join("") + '</div><input type="button" value="' + bookSettings.Text.cancel_booking + '" class="BookSubmit" style="width: 180px; font-weight: normal !important" onclick="CancelBooking();" /></div>', jQuery("#divBookings").html(e).show()
            },
            jsonp: "jsonp"
        })
}

function ValidateBooking() {
    var o, e = "",
        t = jQuery("#BookingKalender").val(),
        i = "";
    if (0 < bookSettings.BookingTypesCount && ("0" == jQuery("#BookingType").val() || null == jQuery("#BookingType").val()) ? (e = bookSettings.Text.bookingtype_missing, jQuery("#BookingType").focus()) : "" == jQuery("#BookingPersoner").val() ? (e = bookSettings.Text.persons_missing, jQuery("#BookingPersoner").focus()) : "" == t ? e = bookSettings.Text.date_missing : "" == bookTime && (e = bookSettings.Text.time_missing), "" == e) {
        bookDate = t, bookPersons = jQuery("#BookingPersoner").val();
        var n = '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.place + ':</div><div class="col2"><div class="semibold">' + bookSettings.Settings[0].Navn + "</div>" + bookSettings.Settings[0].Adresse + "</div></div>";
        0 < bookSettings.BookingTypesCount && (n += '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.type + ':</div><div class="col2 semibold">' + bookingTypeText + "</div></div>"), n += '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.guests + ':</div><div class="col2 semibold">' + bookPersons + " " + bookSettings.Text.pers + '</div></div><div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.date + ':</div><div class="col2 semibold">' + bookDate + '</div></div><div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.time + ':</div><div class="col2 semibold">' + Klokkeslaet(bookTime) + '</div></div><div class="spaceafter" id="rowVarighed"><div class="col1 nomargin">' + bookSettings.Text.duration + ':</div><div class="col2 semibold">' + bookDuration + '</div></div><div class="spaceafter"><div class="col1">' + bookSettings.Text.name + ':</div><div class="col2"><input type="text" id="BookingNavn" maxlength="100" autocomplete="name" value="' + bookName + '" /></div></div><div class="spaceafter"><div class="col1">' + bookSettings.Text.mobile + ':</div><div class="col2"><input type="tel" id="BookingMobil" placeholder=" " maxlength="20" autocomplete="tel" value="' + bookPhone + '" /></div></div>', 1 == bookSettings.Settings[0].IndsamlEmail && (n += '<div class="spaceafter"><div class="col1">' + bookSettings.Text.email + ':</div><div class="col2"><input type="email" id="BookingEmail" maxlength="100" autocomplete="email" value="' + bookEmail + '" /></div></div>'), 1 == bookSettings.Settings[0].IndsamlPostnr && (n += '<div class="spaceafter"><div class="col1">' + bookSettings.Text.zip + ':</div><div class="col2"><input type="text" id="BookingPostnr" maxlength="10" autocomplete="postal-code" style="width: 100px !important;" value="' + bookZip + '" /></div></div>'), 0 < bookSettings.Tags.length && (n += '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.options + ':</div><div class="col2">', jQuery.each(bookSettings.Tags, function(o, e) {
                    n += '<label><input type="checkbox" class="tag" value="' + e.ID + '" />' + e.Navn + "</label>"
                }), n += "</div></div>"), n += '<div class="spaceafter"><div class="col1 nomargin">' + bookSettings.Text.comment + ':</div><div class="col2"><textarea id="BookingKommentar" rows="3" autocomplete="nope">' + bookComment + "</textarea></div></div>", "" != bookInfo && (n += '<div class="spaceafter" id="rowBookingInfo"><div class="col1"></div><div class="col2">', 1 == bookInfoConfirm && (n += '<input type="checkbox" id="BookingInfoBekraeft" value="1" /><label for="BookingInfoBekraeft" class="NewsletterLabel">'), n += bookInfo, 1 == bookInfoConfirm && (n += "</label>"), n += "</div></div>"), 1 == bookConfirmDuration && (n += '<div class="spaceafter" id="rowBookingBekraeft"><div class="col1 nomargin"></div><div class="col2"><input type="checkbox" id="BookingBekraeft" value="1" /><label for="BookingBekraeft" class="NewsletterLabel">' + bookSettings.Text.confirm_duration + "</label></div></div>"), 1 == bookSettings.Settings[0].IndsamlEmail && 1 == bookSettings.Settings[0].BekraeftNyhedsbrev && (1 == bookNyhedsbrev && (i = ' checked="checked"'), n += '<div class="spaceafter"><div class="col1 nomargin"></div><div class="col2"><input type="checkbox" id="BookingNyhedsbrev" value="1"' + i + ' /><label for="BookingNyhedsbrev" class="NewsletterLabel">' + bookSettings.Text.newsletter_signup + "</label></div></div>"), o = "" != bookDeposit || "" != bookPrepay ? bookSettings.Text.go_to_payment : bookSettings.Text.book, n += '<div class="spaceafter"><div class="col1 nomargin"></div><div class="col2"><input type="button" value="' + bookSettings.Text.back + '" class="BookSubmit" onclick="BackBooking();" /><input type="button" value="' + o + '" class="BookSubmit" onclick="DoBooking();" /></div></div>', n = "<form>" + (n += '<div class="terms"><div>' + bookSettings.Text.processing_personal_data + "</div>" + bookSettings.Text.personal_data_terms + "</div>") + "</form>", jQuery(bookDest).html(bookHeader + n), scrollToBooking(), jQuery("#BookingMobil").intlTelInput({
                nationalMode: !1,
                initialCountry: bookSettings.Settings[0].Landekode
            }), window.intlTelInputGlobals.loadUtils("//" + bookDomain + "/javascripts/intlTelInput14.0.6/js/utils.js"), jQuery(".duration").html(bookDuration), 0 == bookShowDuration && jQuery("#rowVarighed").hide()
    } else alert(e)
}

function Klokkeslaet(o) {
    var e = o / 60 + "";
    return -1 < e.indexOf(".") && (e = e.substring(0, e.indexOf("."))), 1 == (o = o - 60 * e + "").length && (o = "0" + o), e + ":" + o
}

function BackBooking() {
    0 < jQuery("#BookingNavn").length && (bookName = jQuery("#BookingNavn").val()), 0 < jQuery("#BookingMobil").length && (bookPhone = jQuery("#BookingMobil").val()), 0 < jQuery("#BookingEmail").length && (bookEmail = jQuery("#BookingEmail").val()), 0 < jQuery("#BookingPostnr").length && (bookZip = jQuery("#BookingPostnr").val()), bookNyhedsbrev = jQuery("#BookingNyhedsbrev").prop("checked") ? 1 : "", 0 < jQuery("#BookingKommentar").length && (bookComment = jQuery("#BookingKommentar").val()), showStep1(), jQuery("#BookingKalender").etb_datepicker("setDate", bookDate), jQuery("#BookingPersoner").val(bookPersons), jQuery("#BookingNavn").val(bookName), jQuery("#BookingMobil").val(bookPhone), jQuery("#BookingEmail") && jQuery("#BookingEmail").val(bookEmail), jQuery("#BookingType") && jQuery("#BookingType").val(bookingType), 1 == bookNyhedsbrev ? jQuery("#BookingNyhedsbrev").prop("checked", !0) : jQuery("#BookingNyhedsbrev").prop("checked", !1), GetTimes(), GetDayNote()
}

function DoBooking() {
    var o = !0,
        e = "",
        t = "";
    if (bookName = jQuery("#BookingNavn").val(), bookPhone = jQuery("#BookingMobil").val(), 0 < jQuery("#BookingEmail").length && (bookEmail = jQuery("#BookingEmail").val()), 0 < jQuery("#BookingPostnr").length && (bookZip = jQuery("#BookingPostnr").val()), bookNyhedsbrev = jQuery("#BookingNyhedsbrev").prop("checked") ? 1 : "", jQuery(".BookingBoxContent .tag:checked").each(function() {
                "" != t && (t += ","), t += jQuery(this).val()
            }), "" === bookName) o = !1, e = bookSettings.Text.name_missing, jQuery("#BookingNavn").focus();
    else if ("" === bookPhone) o = !1, e = bookSettings.Text.mobile_missing, jQuery("#BookingMobil").focus();
    else if ("+" !== bookPhone.charAt(0)) o = !1, e = bookSettings.Text.countrycode_missing, jQuery("#BookingMobil").focus();
    else if (jQuery("#BookingMobil").intlTelInput("isValidNumber")) 1 == bookSettings.Settings[0].IndsamlEmail && 1 == bookSettings.Settings[0].EmailObligatorisk && "" == bookEmail ? (o = !1, e = bookSettings.Text.email_missing, jQuery("#BookingEmail").focus()) : 1 != bookSettings.Settings[0].IndsamlEmail || "" == bookEmail || validateEmail(bookEmail) ? 1 == bookSettings.Settings[0].IndsamlPostnr && "" == bookZip && (o = !1, e = bookSettings.Text.zip_missing, jQuery("#BookingPostnr").focus()) : (o = !1, e = bookSettings.Text.email_invalid, jQuery("#BookingEmail").focus());
    else {
        o = !1, e = bookSettings.Text.mobile_invalid;
        var i = jQuery("#BookingMobil").intlTelInput("getValidationError");
        1 == i ? e += " (invalid country code)" : 2 == i ? e += " (too short)" : 3 == i ? e += " (too long)" : 4 == i && (e += " (not a number)"), jQuery("#BookingMobil").focus()
    } if (o && (1 == bookConfirmDuration && (jQuery("#BookingBekraeft").prop("checked") || (o = !1, jQuery("#rowBookingBekraeft .col2").css("box-sizing", "border-box"), jQuery("#rowBookingBekraeft .col2").css("border", "2px dashed red"), jQuery("#rowBookingBekraeft .col2").css("padding", "2px"))), 1 == bookInfoConfirm && (jQuery("#BookingInfoBekraeft").prop("checked") || (o = !1, jQuery("#rowBookingInfo .col2").css("box-sizing", "border-box"), jQuery("#rowBookingInfo .col2").css("border", "2px dashed red"), jQuery("#rowBookingInfo .col2").css("padding", "2px")))), o) {
        var n;
        jQuery(".BookSubmit").attr("disabled", "disabled"), bookComment = jQuery("#BookingKommentar").val();
        var a = "place=" + bookPlace + "&date=" + bookDate + "&persons=" + bookPersons + "&mobile=" + encodeURIComponent(bookPhone) + "&name=" + encodeURIComponent(bookName) + "&email=" + encodeURIComponent(bookEmail) + "&zip=" + encodeURIComponent(bookZip) + "&time=" + bookTime + "&newsletter=" + bookNyhedsbrev + "&type=" + bookingType + "&comment=" + encodeURIComponent(bookComment) + "&lcid=" + bookSettings.Text.lcid + "&lang=" + bookLang + "&ref=" + bookRef + "&tags=" + t;
        jQuery.ajax({
                type: "GET",
                url: "//" + bookDomain + "/user/ajax/json_booking.asp",
                data: a,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                dataType: "jsonp",
                success: function(o) {
                    jQuery.each(o, function(o, e) {
                        0 == e.Status ? (n = 0 == e.Duplikat ? bookSettings.Text.booking_not_completed : bookSettings.Text.booking_not_completed_duplicate, n += '<br><br><div align="center"><input type="button" value="' + bookSettings.Text.back + '" class="BookSubmit" onclick="BackBooking();" /></div>') : 1 == e.Status && (n = bookSettings.Text.please_wait, null != e.BetalingLongID ? location = "https://book.easytablebooking.com/pay/?id=" + e.BetalingLongID : null != bookSettings.Settings[0].BekraeftURL ? location = bookSettings.Settings[0].BekraeftURL.replace("[id]", e.BookingID).replace("[pers]", bookPersons).replace("[date]", bookDate).replace("[arrival]", bookTime).replace("[payment]", "0").replace("[currency]", "").replace("[lcid]", bookSettings.Text.lcid) : (n = bookSettings.Text.booking_complete_1, 1 == e.SMS ? n += " " + bookSettings.Text.booking_complete_sms : 1 == e.Email && (n += " " + bookSettings.Text.booking_complete_email), n += bookSettings.Text.booking_complete_2)), jQuery(bookDest).html(bookHeader + "<div>" + n + "</div>")
                    })
                },
                jsonp: "jsonp"
            })
    } else "" != e && alert(e)
}

function CancelBooking() {
    if (1 == jQuery(".BookingBoxContent input[name=cancelBooking]:checked").length) {
        var o = "place=" + bookPlace + "&mobile=" + encodeURIComponent(cancelPhone) + "&booking=" + jQuery(".BookingBoxContent input[name=cancelBooking]:checked").val();
        jQuery.ajax({
                type: "GET",
                url: "//" + bookDomain + "/user/ajax/json_cancel_booking.asp",
                data: o,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                dataType: "jsonp",
                success: function(o) {
                    jQuery.each(o, function(o, e) {
                        1 == e.Status && (html = bookSettings.Text.booking_cancelled), jQuery(bookDest).html(bookHeader + '<div class="spaceafter">' + html + "</div>")
                    })
                },
                jsonp: "jsonp"
            })
    } else alert(bookSettings.Text.booking_missing)
}

function ChangePlace() {
    1 == jQuery(".BookingBoxContent input[name=alternative]:checked").length ? (bookPlace = jQuery(".BookingBoxContent input[name=alternative]:checked").val(), loadWidget()) : alert(bookSettings.Text.alternative_restaurants_missing)
}

function closePopup() {
    jQuery("#BookingBackground").fadeOut(400, function() {
        this.remove()
    }), bookDest = "", jQuery("html").removeClass("etpPopup")
}

function scrollToBooking() {
    var o = jQuery(window).scrollTop(),
        e = jQuery(".BookingBoxContent").offset().top;
    e < o && jQuery("html, body").animate({
            scrollTop: e
        }, 500)
}

function sizeCheck() {
    jQuery(".BookingBoxContent").width() < 360 ? jQuery(".BookingBoxContent").addClass("compact") : jQuery(".BookingBoxContent").removeClass("compact")
}

function validateEmail(o) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o)
}

function getQueryString(o, e) {
    var t, i = o.match(new RegExp(e + "=([^&]*)"));
    return null != i && (t = i[1]), t
}
st.rel = "stylesheet", st.href = "//" + bookDomain + "/javascripts/intlTelInput14.0.6/css/intlTelInput.min.css", st.type = "text/css", head.appendChild(st, head), runJQuery();