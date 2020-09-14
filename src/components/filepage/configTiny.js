tinymce.init({
  selector: '#miaonote',
  plugins: 'link, hr, searchreplace, emoticons, insertdatetime',
  toolbar: `undo redo | bold italic underline strikethrough | alignleft 
          aligncenter  alignright alignjustify | subscript superscript | formater | link hr searchreplace emoticons insertdatetime |
          fontsizeselect`,
  menubar: 'edit format',   // 取消顶端的编辑栏
  toolbar_mode: "sliding",
  width: '100vw',
  height: '100vh',
  branding: false,
  resize: false,
  elementpath: false,
  language:'zh_CN'
})