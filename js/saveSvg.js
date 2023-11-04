document.querySelector('.download-svg').addEventListener('click', function () {
    // 获取SVG元素
    const svg = document.querySelector('#barcode');

    // 创建一个新Blob对象，将SVG内容放入其中
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });

    // 创建一个下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcode.svg';

    // 模拟点击下载链接
    a.click();

    // 释放URL对象
    URL.revokeObjectURL(url);
});
document.querySelector('.copy-svg-code').addEventListener('click', function () {
      // 获取SVG元素的代码
      const svgCode = document.querySelector('#barcode').outerHTML;

      // 创建一个文本区域元素
      const textarea = document.createElement('textarea');
      textarea.value = svgCode;

      // 将文本区域添加到文档中
      document.body.appendChild(textarea);

      // 选择文本区域中的内容
      textarea.select();

      // 复制选定的文本到剪贴板
      document.execCommand('copy');

      // 移除文本区域元素
      document.body.removeChild(textarea);

      alert('SVG代码已复制到剪切板');
  });