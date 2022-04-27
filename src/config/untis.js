import JsPDF from 'jspdf'
import html2Canvas from 'html2canvas'

export function getPdf(ele) {
  let title = '标题'
  let a = document.querySelector(ele)
  let width = a.innerWidth
  let height = a.innerHeight
  let scale = 2
  let params = {
    scale: scale,
    width: width,
    height: height,
    useCORS: true,
    log: false
  }
  html2Canvas(document.querySelector(ele), params).then(function (canvas) {
    let contendWidth = canvas.width
    let contentHeight = canvas.height
    //生成pdf的高度,A4纸的宽高： 592.28,841.89
    let pdfPageHeight = (contendWidth / 592.28) * 841.89
    //未生成pdf的html页面高度
    let leftPageHeight = contentHeight
    //页面偏移
    let position = 0
    let imgWidth = 592.28
    let imgHeight = (592.28 / contendWidth) * contentHeight
    let PDF = new JsPDF('', 'pt', 'a4')
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    //当一页内容没超过一个pdf时，不用分页
    if (leftPageHeight < pdfPageHeight) {
      PDF.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftPageHeight > 0) {
        PDF.addImage(pageData, 'jpeg', 0, position, imgWidth, imgHeight)
        leftPageHeight -= pdfPageHeight
        position -= 841.89
        //避免空白页
        if (leftPageHeight > 0) {
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  })
}
