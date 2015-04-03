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
		onCategorySelection : function(e) {
			var term = $(e.target).parents(".category").find(".term").text();
			$(".site-content").load("html/results.html", function() {
				search.params = {
					term : term,
					page : 0
				};

				search.showResults();
			});
		}
	}
};

var search = {
	maxItems : 5,
	params : {
		term : "",
		page : 0
	},
	loading : undefined,
	template : undefined,
	showResults : function() {
		search.loading = $(".loading-template .list-group-item").clone();
		search.template = $(".result-template .list-group-item").clone();
		$(".loading-template").remove();
		$(".result-template").remove();

		search.loadItems();
		search.nextPage();
		search.nextPage();
		utils.infiniteScrolling(search.nextPage);
		$(".items .loading").remove();
		$(".items").append(search.loading.clone());
		$(".items").append(search.loading.clone());
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
		var items = $(".items");
		$.ajax({
			type : 'GET',
			url : api,
			dataType : "jsonp",
			success : function(data) {
				if (data.responseData && data.responseData.results) {
					var images = data.responseData.results;
					$(".items .loading").remove();
					$.each(images, function(imageIndex) {
						var image = images[imageIndex]
						var item = search.template.clone();
						item.find(".item-img").attr("src", image.tbUrl);
						item.find(".item-name").text(image.contentNoFormatting);
						item.find(".item-desc").text(image.titleNoFormatting);
						items.append(item);
					});
					$(".items").append(search.loading.clone());
					$(".items").append(search.loading.clone());
				} else {
					$($(".items .loading")[0]).remove();
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
				// $(".items .loading").remove();
				// $(".items").append(search.loading.clone());
				// $(".items").append(search.loading.clone());
				// var top = $($(".items .loading")[0]).position().top;
				// $(window).scrollTop(top);
				setTimeout(function() {
					callback();
				}, 3000);
			}
		});
	}
};

app.initialize();