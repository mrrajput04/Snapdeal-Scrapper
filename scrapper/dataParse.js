const cheerio = require("cheerio");


const parseProductLinks = (html) => {
  const $ = cheerio.load(html);
  const data = $("div.product-tuple-description > div.product-desc-rating > a");
  if (data.length <= 0)
    return "nothing found";
  const list = [];
  data.each((index,ele)=>{
    list.push($(ele).attr("href"));
  })
  return list;
}


  const parseProductDetails = (html)=>{
    const $ = cheerio.load(html);
      const productFullDetails = {};
    productFullDetails.name = $(".product-title").text();
    productFullDetails.imageURL = $(".cloudzoom").attr("src");
    productFullDetails.price = $("#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdp-final-price").text();
    productFullDetails.rating = {};
    productFullDetails.rating.overall = $(".avrg-rating").text();
    productFullDetails.rating.ratings = $(" .total-rating").text();
    productFullDetails.colorAndSize = [];
    $(".attr-val").each((index, el) => {
      productFullDetails.colorAndSize.push($(el).text());
    });
    productFullDetails.highlight = [];
    $(".dtls-li > span.h-content").each(
      (index, el) => {
        productFullDetails.highlight.push($(el).text());
      }
      );
      productFullDetails.description = $(
        "#id-tab-container > div > div:nth-child(3) > div.spec-body > div "
        ).text().trim();
        
        return productFullDetails;
      };

module.exports = {parseProductLinks, parseProductDetails};
