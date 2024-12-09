// const SURVEY_ID = 1;

const surveyJson = {
    elements: [{
        name: "Your Name",
        title: "Tên khách hàng:",
        type: "text"
    }, {
        type: "text",
        name: "phoneNumber",
        title: "Điện thoại liên hệ:",
        isRequired: true,
      }, {
        name: "product",
        title: "Chọn sản phẩm:",
        isRequired: true,
        type: "radiogroup",
        choices: [
            "Pirates*Moon Artificial Intelligence - 700ml - 999.000 VNĐ"
        ],
        defaultValue: "Pirates*Moon Artificial Intelligence - 700ml - 999.000 VNĐ",

    }, {
        type: "dropdown",
        name: "quantity",
        title: "Số lượng:",
        isRequired: true,
        defaultValue: 1,
        choices: Array.from({ length: 18 }, (_, i) => (i + 1).toString())
      }, {
        type: "text",
        name: "email",
        title: "Email liên hệ:",
        inputType: "email",
        validators: [
          {
            type: "email",
            text: "Địa chỉ email dùng để nhận thông tin đơn hàng."
          }
        ]
      },{
        type: "text",
        name: "street",
        title: "Địa chỉ nhận hàng:",
        isRequired: true
      },
      {
        type: "text",
        name: "city",
        title: "Tỉnh / Thành phố:",
        isRequired: true
    }, {
        type: "comment",
        name: "note",
        title: "Ghi chú:",
        placeHolder: "Những lưu ý dành cho đơn hàng hoặc người giao hàng."
      }, ]
};

const survey = new Survey.Model(surveyJson);


function sendDataToServer(survey) {
    //send Ajax request to your web server.
    console.log("The results are:" + JSON.stringify(survey.data));
    $.ajax({
    url: 'https://prod-03.southeastasia.logic.azure.com:443/workflows/21e42630b73249f591eb2cf9e61c1073/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YOSZPuXbUbc_6ysC4tEHLdnVCnfRgH0V1JImbxZErFk',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) { console.log(data.msg);},
    data: JSON.stringify(survey.data)
    });
};


survey.onComplete.add(sendDataToServer);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

