/*
03_295669_2019_SP3_CDOMARKET421_verify_data_products_associated_with_application_is_displayed
07_295669_2019_SP3_CDOMARKET421_verify_clicking_on_data_product_listed_under_application
11_295669_2019_SP3_CDOMARKET421_verify_data_product_is_listed_alphabetically_under_application_data_class
Created By: Sreedevi Tdogiala
Date Created: 01/19/19
*/


var helper = require('../page/helper.js');
var globals = require('../page/globals.js');
var searchResultsApplication = require('../page/search_results_application.js');
var searchResultsAllDataClasses = require('../page/search_results_allDataClasses.js')
var searchDetailsAllDataClasses = require('../page/search_details_allDataClasses.js');
var searchDetailsApplication = require('../page/search_details_application.js');

describe('searchdetails_associated_application_dataproducts_02.js- the data products associated with the application is displayed on the details page validation ', function () {

	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999;
	});
	//element(by.css("svg[class='ml-2 thumbsDown selected']"))
	// Go to Home Page after tests finish
	afterAll(function () {
		globals.gotoHome();

	});
	browser.ignoreSynchronization = true;
	browser.waitForAngularEnabled(false);

	it('Verify that the data products associated with the application is displayed on the details page', function () {
		console.log("***********************  searchdetails_associated_application_dataproducts_02.js ***********************************");

		searchResultsAllDataClasses.searchCheckuncheckAll();
		//Search the application with given data then will see the associated data products in the details page
		searchResultsApplication.applicationSearch('AID - COMMON SOURCE TAX TO ECDW');
		browser.wait(globals.EC.presenceOf(searchResultsAllDataClasses.resultsCount), 10000);
		//Navigating to details page
		searchDetailsAllDataClasses.navigateDetailPage();

		//Verify available data products on details page
		browser.wait(globals.EC.presenceOf(searchDetailsApplication.dataProducts), 10000);
		searchDetailsApplication.dataProducts.count().then(function (count) {
			console.log("Application data products list on details page: " + count);
		});
		searchDetailsApplication.dataProducts.getText().then(function (dataproducts) {
			console.log("Application data products list on details are printing: " + dataproducts);
		});
	});

	it('Verify User should be taken to details page of the data product', function () {

		browser.getTitle().then(function (title) {
			console.log("Title of the page before switching window" + " " + title);
			//Click on Mots Id to navigate to different page
			//browser.wait(globals.EC.presenceOf(searchDetailsApplication.dataProducts), 10000);
			searchDetailsApplication.dataProducts.get(0).getText().then(function (text) {
				searchDetailsApplication.dataProducts.get(0).click();
				console.log("Main window dataproduct:" + " " + text);
				//globals.sleep(2000);
				browser.getAllWindowHandles().then(function (handles) {
					browser.switchTo().window(handles[1]);
					globals.sleep(2000);
					browser.getTitle().then(function (title1) {
						console.log("Title of the page after switching parent window to child window" + " " + title1);
						//browser.wait(globals.EC.presenceOf(searchDetailsApplication.dataProductspage), 10000);
						searchDetailsApplication.dataProductspage.getText().then(function (text1) {
							console.log("Child window dataproduct:" + " " + text1);
							//globals.sleep(2000);
							browser.switchTo().window(handles[0]);
							globals.sleep(2000);
							browser.getTitle().then(function (title2) {
								console.log("Title of the page after switching from child window to parent window" + " " + title2);
								expect(title).toEqual(title2);

							});
						});
					});
				});
			});
		});

	});


	it('Verify Data products should be listed in alphabetical order', function () {
		// Verify Data productss are sorted in ascending order in details page.
		var sorted = [], unSorted = [];
		var dataproductResults = searchDetailsApplication.dataProducts;

		dataproductResults.map(function (eachName) {
			return eachName.getText().then(function (unSorted) {
				return unSorted.toUpperCase();
			});
		}).then(function (unSorted) {
			sorted = unSorted.slice();
			// sort the array
			sorted = sorted.sort();
			// check if both sorted and unsorted arrays are same
			expect(sorted).toEqual(unSorted);
			console.log("dataproduct Results list sorted from Low to High");
			console.log(sorted);
		});

	});

});