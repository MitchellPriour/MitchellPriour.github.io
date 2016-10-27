var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf', 'gdgmmfgjalcpnakohgcfflgccamjoipd ']);

var currentMenuId;
var menuOpen = false;
var favorites = [];
var products = [];
var productCards = [];
var filters = {
	"price":[false,false,false,false],
	"averageRating":[false,false,false,false]
};

var urls = [
    {"amazon":"https://www.amazon.com/Radeon-128-Bit-Graphics-Cards-R7250-2GD5/dp/B01F3QEZ1U", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA1N84829645"}, /* Replace this */
    {"amazon":"https://www.amazon.com/Sapphire-Radeon-backplate-Graphics-11260-07-20G/dp/B01J1M4BZ2", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16814202224"},
    {"amazon":"https://www.amazon.com/EVGA-GeForce-Display-Graphics-02G-P4-3757-KR/dp/B00J0ISHMQ", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16814487028"},
    {"amazon":"https://www.amazon.com/MSI-GAMING-RX-470-4G/dp/B01JS9F9K4", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16814137024"}, /* this one */
    {"amazon":"https://www.amazon.com/EVGA-GeForce-Support-Graphics-08G-P4-6173-KR/dp/B01GX5YWAO", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16814487248"},
    {"amazon":"https://www.amazon.com/EVGA-GeForce-Support-Graphics-03G-P4-6162-KR/dp/B01KU2CIIY", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16814487263"}, /* this one */
    {"amazon":"https://www.amazon.com/2133MHz-Non-ECC-Desktop-HX421C14FBK2-16/dp/B00TY6A1LY", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16820104531"},
    {"amazon":"https://www.amazon.com/Kingston-Technology-HyperX-HX421S13IBK2-16/dp/B014R8JRRW", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16820233982"},
    {"amazon":"https://www.amazon.com/Crucial-Ballistix-PC3-12800-240-Pin-BLS2KIT8G3D1609DS1S00/dp/B006YG9EEW", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA5752RR9050"},
    {"amazon":"https://www.amazon.com/Ballistix-Sport-Single-PC4-19200-288-Pin/dp/B01DPSQOO4", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16820156109"},
    {"amazon":"https://www.amazon.com/G-SKILL-Ripjaws-288-Pin-Desktop-F4-2400C15D-16GVR/dp/B013J7T5K6", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16820231888"},
    {"amazon":"https://www.amazon.com/Corsair-Vengeance-2x8GB-2400MHz-Desktop/dp/B00EUPV2RQ", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16820233585"},
    {"amazon":"https://www.amazon.com/Intel-Unlocked-Skylake-Processor-BX80662I76700K/dp/B012M8LXQW", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16819117559"},
    {"amazon":"https://www.amazon.com/Intel-I7-6700-FC-LGA14C-Processor-BX80662I76700/dp/B0136JONG8", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16819117560"},
    {"amazon":"https://www.amazon.com/Intel-i3-6100-Cache-Processor-BX80662I36100/dp/B015VPX2EO", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=2MN-0004-00002"},
    {"amazon":"https://www.amazon.com/AMD-FD8350FRHKBOX-FX-8350-8-Core-Processor/dp/B009O7YUF6", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16819113282"},
    {"amazon":"https://www.amazon.com/AMD-8-Core-FX-8350-Processor-FD8350FRHKHBX/dp/B01F4ZOB3C", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16819113415"},
    {"amazon":"https://www.amazon.com/Intel-Skylake-Desktop-Processor-BX80662I56600K/dp/B012M8M7TY", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16819113284"}
];

function product(brand, model, price, imageUrl, averageRating, reviews, specifications, id, amazonUrl, neweggUrl, index) {
    this.brand = brand;
	this.model = model;
	this.price = price;
	this.imageUrl = imageUrl;
	this.averageRating = averageRating;
	this.reviews = reviews;
	this.favorite = false;
	this.specifications = specifications;
    this.id = id;
	this.showOnPage = true;
    this.amazonUrl = amazonUrl;
    this.neweggUrl = neweggUrl;
    this.index = index;
}

//window.onload = function() { 
//	buildProducts();
//   	/* buildProductCards(); */
//};

function buildProducts() {
    for (i = 0; i < urls.length; i++) {
//    					  product(brand, model, price, imageUrl, averageRating, reviews, specifications, id, amazonUrl, neweggUrl)
        products.push(new product("", "", 0, "", 0, [], {}, "product" + i, urls[i]["amazon"], urls[i]["newegg"], i));
        bsService.loadMetadata(urls[i]["amazon"], {}, amazon);
        bsService.loadMetadata(urls[i]["newegg"], {}, newegg);
    }
/* 	for (i = 0; i < 5; i++)
	{
		
		products.push(new product("AXESS", "SPBT1031-RD", 119.99 - (25 * i), 
			"https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
			1 + (0.5 * (i + 1)), productObj.reviews, false, productObj.specifications,
			"product" + i, true));
	} */
}

function amazon(err, metadataAndMetametaData)
{
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
    console.log(unwrappedMetadata);
    
    var i = 0;
    for (i; i < products.length; i++)
    {
        if (products[i].amazonUrl == unwrappedMetadata["location"]) {
            break;
        }
    }

    try {
        var price = Number(unwrappedMetadata["price"].substring(1));
        var imageUrl = unwrappedMetadata["main_images"][0]["location"];
        var averageRating = Number(unwrappedMetadata["overall_rating"].substring(0, 2));

        products[i].price = price;
        products[i].imageUrl = imageUrl;
        products[i].averageRating = averageRating;
        
        var reviews = unwrappedMetadata["reviews"];
        
        for (j = 0; j < reviews.length; j++) {
            var rating = Number(reviews[j]["rating"].substring(0, 1));
            var title = reviews[j]["title"];
            var description = reviews[j]["description"];
            
            products[i].reviews.push({"rating":rating, "title":title, "description":description});
        }

    } catch (e) {
        
    }
    
    if (products[i].brand != "") {
        buildProductCard(products[i]);
    }
}

function newegg(err, metadataAndMetametaData) {
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
    console.log(unwrappedMetadata);
    
    var i = 0;
    for (i; i < products.length; i++)
    {
        if (products[i].neweggUrl == unwrappedMetadata["location"]) {
            break;
        }
    }
    try {
        var specsTable = unwrappedMetadata["specifications_table"];
        
        for (j = 0; j < specsTable.length; j++)
        {
            var specifications = specsTable[j]["specifications"];
            for (k = 0; k < specifications.length; k++) {
                if (specifications[k]["name"] == "Brand")
                {
                    var brand = specifications[k]["value"];
                    products[i].brand = brand;
                } else if (specifications[k]["name"] == "Model") {
                    var model = specifications[k]["value"];
                    products[i].model = model;
                } else {
                    var name = specifications[k]["name"];
                    var value = specifications[k]["value"];
                    products[i].specifications[name] = value;
                }
            }
        }
    } catch (e) {
        
    }
    
    if (products[i].price != 0) {
        buildProductCard(products[i]);
    }

}

function buildProductCard(product) {
    var productsContainer = document.getElementById("products-container");
    
    var productCard = document.createElement("div");
    productCard.className = "product-card";        
    productCard.id = product.id;

    var container = document.createElement("div");
    container.className += "product-container";

    var imgContainer = document.createElement("div");
    imgContainer.className = "product-image-container";

    var image = document.createElement("img");
    image.src = product.imageUrl;

    var productName = document.createElement("div");
    productName.className = "product-name";
    productName.innerHTML = product.brand + " " + product.model + " ";
    
    var starAndPriceContainer = document.createElement("div");
    starAndPriceContainer.className = "product-rating-and-price-container";
    
    var stars = document.createElement("div");
    stars.className = "product-rating";

    for (j = 0; j < 5; j++) {
        var star = document.createElement("i");
        if (j + 0.5 < product.averageRating) {
            star.className = "fa fa-star";
        } else if (j + 0.5 == product.averageRating) {
            star.className = "fa fa-star-half-o";
        } else {
            star.className = "fa fa-star-o";
        }
        stars.appendChild(star);
    }

    var price = document.createElement("div");
    price.className = "product-price";
    price.innerHTML = "$"+product.price.toFixed(2);

    imgContainer.appendChild(image);
    container.appendChild(imgContainer);
    container.appendChild(productName);
    starAndPriceContainer.appendChild(stars);
    starAndPriceContainer.appendChild(price);
    container.appendChild(starAndPriceContainer);
    productCard.appendChild(container);
        
//    productCard.oncontextmenu = (function() {
//        var currentId = productCard.id;
//        return function() {
//            openCircularMenu(currentId + "Menu");
//        }
//    })();
    
    
    var productCardId = productCard.id;
    productCards[productCardId] = productCard;
    
    var productCardLink = document.createElement("a");
    productCardLink.href = "productPage.html?index=" + product.index;
    productCardLink.appendChild(productCard);
    productsContainer.appendChild(productCardLink);
    	
}

function addTooltip(element, tooltipText) {
	var tooltipTextElement = document.createElement("span");
	
	element.className += " tooltip";
	tooltipTextElement.className = "tooltip-text";
	tooltipTextElement.innerHTML = tooltipText;
	
	element.appendChild(tooltipTextElement);
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function () {
    $('#checkbox1').change(function () {
        if (!this.checked) 
        //  ^
           $('#autoCNET').fadeOut('slow');
        else 
            $('#autoCNET').fadeIn('slow');
    });
});
$(document).ready(function () {
    $('#checkbox2').change(function () {
        if (!this.checked) 
        //  ^
           $('#autoDigit').fadeOut('slow');
        else 
            $('#autoDigit').fadeIn('slow');
    });
});
$(document).ready(function () {
    $('#checkbox3').change(function () {
        if (!this.checked) 
        //  ^
           $('#autoSoftonic').fadeOut('slow');
        else 
            $('#autoSoftonic').fadeIn('slow');
    });
});
$(document).ready(function () {
    $('#checkbox4').change(function () {
        if (!this.checked) 
        //  ^
           $('#autoReview').fadeOut('slow');
        else 
            $('#autoReview').fadeIn('slow');
    });
});
$(document).ready(function () {
    $('#checkbox5').change(function () {
        if (!this.checked) 
        //  ^
           $('#autoProReviews').fadeOut('slow');
        else 
            $('#autoProReviews').fadeIn('slow');
    });
});