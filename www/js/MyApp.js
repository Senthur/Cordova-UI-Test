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
				search.params = {
					term : "Pistacho",
					page : 0
				};
				search.loadItems();
				utils.infiniteScrolling(search.nextPage);
				// search.image("Pistacho", 1);
				// search.image("Pistacho", 2);
				// search.image("Pistacho", 3);
			});
		}
	}
};

var search = {
	maxItems : 8,
	params : {
		term : "",
		page : 0
	},
	nextPage : function() {
		search.params.page = search.params.page + 1;
		search.loadItems();
	},
	loadItems : function() {
		// https://developers.google.com/image-search/v1/jsondevguide
		// http://jscroll.com/
		var count = 8;
		var api = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=" + search.maxItems + "&start="
				+ (search.params.page * search.maxItems) + "&q=" + search.params.term;
		console.log(api);
		var items = $(".items");
		var template = $(".result-template .list-group-item").clone();
		$.ajax({
			type : 'GET',
			url : api,
			dataType : "jsonp",
			success : function(data) {
				if (data.responseData && data.responseData.results) {
					var images = data.responseData.results;
					$.each(images, function(imageIndex) {
						var image = images[imageIndex]
						var item = template.clone();
						item.find(".item-img").attr("src", image.tbUrl);
						item.find(".item-name").text(image.contentNoFormatting);
						item.find(".item-desc").text(image.titleNoFormatting);
						items.append(item);
					});
				}
			},
			failure : function(err) {
				alert(err);
			}
		});
	}
};

var utils = {
	infiniteScrolling : function(callback) {
		$(window).scroll(function() {
			if ($(window).scrollTop() == $(document).height() - $(window).height()) {
				$('div.loading').show();
				callback();
				// $.ajax({
				// url : "loadmore.php",
				// success : function(html) {
				// if (html) {
				// $("#postswrapper").append(html);
				// $('div#loadmoreajaxloader').hide();
				// } else {
				// $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
				// }
				// }
				// });
			}
		});
	}
};

app.initialize();