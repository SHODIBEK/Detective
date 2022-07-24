$('form').each(function() {  // attach to all form elements on page
  $(this).validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
    },
    messages: {
      name: "Это поле обязателен",
      email: {
        required: "Это поле обязателен",
        email: "Пожалуйста, укажите действующий адрес электронной почты"
      },
      phone: "Это поле обязателен"
    },
    submitHandler: function() {
      // do thomething
    }
  });
});