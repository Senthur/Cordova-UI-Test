var app = {
	initialize : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		// document.addEventListener('deviceready', this.onDeviceReady, false);
		app.onDeviceReady();
	},
	onDeviceReady : function() {
		ui.showHome();
	}
};

var ui = {
	showHome : function() {
		$(".site-content").load("html/home.html");
		$(".site-content").on("click", ".home-icons", ui.home.onHomeNavigationButtonClick);
	},
	home : {
		onHomeNavigationButtonClick : function() {
			$(".site-content").load("html/search.html", function() {
				$(".search-text").trigger('click').focus();
			});
			$(".site-content").on("click", ".search", ui.search.onSearch);
		}
	},
	search : {
		onSearch : function() {
			$(".site-content").load("html/result-group.html");
			$(".site-content").on("click", ".category-icons", ui.category.onCategorySelection);
		}
	},
	category : {
		onCategorySelection : function() {
			$(".site-content").load("html/results.html", function() {
				$('.items').jscroll({
					loadingHtml : '<img src="loading.gif" alt="Loading" /> Loading...',
					autoTriggerUntil : 10,
					callback : function(x) {
						console.log("here");
						console.log(x);
					}
				});
				search.image("Pistacho", 0);
				search.image("Pistacho", 1);
				search.image("Pistacho", 2);
				search.image("Pistacho", 3);
			});
		}
	}
};

var search = {
	image : function(str, start) {
		// https://developers.google.com/image-search/v1/jsondevguide
		// http://jscroll.com/
		var count = 8;
		var api = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=" + count + "&start=" + count * start + "&q=" + str;
		var items = $(".items");
		var template = $(".result-template .list-group-item").clone();
		$.ajax({
			type : 'GET',
			url : api,
			dataType : "jsonp",
			success : function(data) {
				var images = data.responseData.results;
				$.each(images, function(imageIndex) {
					var image = images[imageIndex]
					var item = template.clone();
					item.find(".item-img").attr("src", image.tbUrl);
					item.find(".item-name").text(image.contentNoFormatting);
					item.find(".item-desc").text(image.titleNoFormatting);
					items.append(item);
				});
			},
			failure : function(err) {
				alert(err);
			}
		});
	}
}

app.initialize();