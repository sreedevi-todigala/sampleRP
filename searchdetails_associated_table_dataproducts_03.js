/*
02_295669_2019_SP3_CDOMARKET421_verify_data_products_associated_with_table_is_displayed
06_295669_2019_SP3_CDOMARKET421_verify_clicking_on_data_product_listed_under_table
10_295669_2019_SP3_CDOMARKET421_verify_data_product_is_listed_alphabetically_under_table_data_class
Created By: Sreedevi Tdogiala
Date Created: 01/19/19
*/


var helper = require('../page/helper.js');
var globals = require('../page/globals.js');
var searchResultsTable = require('../page/search_results_table.js');
var searchResultsAllDataClasses = require('../page/search_results_allDataClasses.js')
var searchDetailsAllDataClasses = require('../page/search_details_allDataClasses.js');
var searchDetailsTable = require('../page/search_details_table.js');

describe('searchdetails_associated_table_dataproducts_03.js- the data products associated with the table is displayed on the details page validation ', function () {

	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999;
	});
	element(by.css("svg[class='ml-2 thumbsDown selected']"))
	// Go to Home Page after tests finish
	afterAll(function () {
		globals.gotoHome();

	});
	browser.ignoreSynchronization = true;
	browser.waitForAngularEnabled(false);

	it('Verify that the data products associated with the table is displayed on the details page', function () {
		console.log("***********************  searchdetails_associated_table_dataproducts_03.js ***********************************");

		searchResultsAllDataClasses.searchCheckuncheckAll();
		searchResultsTable.tableSearch('BILLING_RATES_YYYYMM.CSV');

		helper.waitUntilReady(searchResultsAllDataClasses.resultsCount);

		searchResultsAllDataClasses.searchCount();

		searchDetailsAllDataClasses.navigateDetailPage();

		//Verify available data products on details page
		searchDetailsTable.dataProducts.count().then(function (count) {
			console.log("Table data products list on details page: " + count);
		});
		searchDetailsTable.dataProducts.getText().then(function (dataproducts) {
			console.log("Table data products list on details are printing: " + dataproducts);
		});
	});

	it('Verify User should be taken to details page of the data product', function () {

		browser.getTitle().then(function (title) {
			console.log("Title of the page before switching window" + " " + title);

			//Click on data product to navigate to different page
			browser.wait(globals.EC.presenceOf(searchDetailsTable.dataProducts), 10000);
			searchDetailsTable.dataProducts.get(0).getText().then(function (text) {
				searchDetailsTable.dataProducts.get(0).click();
				console.log("Main window dataproduct:" + " " + text);
				globals.sleep(4000);
				browser.getAllWindowHandles().then(function (handles) {
					browser.switchTo().window(handles[1]);
					globals.sleep(2000);
					browser.getTitle().then(function (title1) {
						console.log("Title of the page after switching parent window to child window" + " " + title1);
						browser.wait(globals.EC.presenceOf(searchDetailsTable.dataProductspage), 10000);
						searchDetailsTable.dataProductspage.getText().then(function (text1) {
							console.log("Child window dataproduct:" + " " + text1);
							globals.sleep(2000);
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
		var dataproductResults = searchDetailsTable.dataProducts;

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