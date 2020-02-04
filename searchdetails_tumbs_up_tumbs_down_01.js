/*
01_DSC_2018_SP8_DSCFIND-1292_verify_thumbs_up_and_down_icon_in_object_details_page_UI
02_DSC_2018_SP8_DSCFIND-1292_verify_thumbs_up_functionality_in_object_details_page_UI
03_DSC_2018_SP8_DSCFIND-1292_verify_thumbs_down_functionality_in_object_details_page_UI
04_DSC_2018_SP8_DSCFIND-1292_verify_one_thumb_at_a_time_in_object_details_page_UI
05_DSC_2018_SP8_DSCFIND-1292_verify_user_clicks_same_thumb_again_in_object_details_page_UI
Created By: Sreedevi Tdogiala
Date Created: 01/18/19
*/

var helper = require('../page/helper.js');
var globals = require('../page/globals.js');
var searchResultsApplication = require('../page/search_results_application.js');
var searchResultsAllDataClasses = require('../page/search_results_allDataClasses.js')
var searchDetailsAllDataClasses = require('../page/search_details_allDataClasses.js');

describe('searchdetails_tumbs_up_tumbs_down_01.js- Thumbs up and Thumbs down validation ', function () {

	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999;
	});
	element(by.css("svg[class='ml-2 thumbsDown selected']"))
	// Go to Home Page after tests finish
	afterAll(function () {
		globals.gotoHome();

	});
	it('Select Column Search Validate thumbsUp and thumbsDown icons', function () {
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_01.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_02.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_03.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_04.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_05.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_06.js ***********************************");
		console.log("***********************  searchdetails_tumbs_up_tumbs_down_07.js ***********************************");
console.log("***********************  searchdetails_tumbs_up_tumbs_down_08.js ***********************************");
console.log("***********************  searchdetails_tumbs_up_tumbs_down_09.js ***********************************");
console.log("***********************  searchdetails_tumbs_up_tumbs_down_10.js ***********************************");


		searchResultsAllDataClasses.searchCheckuncheckAll();
		searchResultsApplication.applicationSearch('customer');
		//browser.driver.sleep(4000);
		helper.waitUntilReady(searchResultsAllDataClasses.resultsCount);
		searchDetailsAllDataClasses.navigateDetailPage();

		// ensure that the thumbs-up and thumbs-down exists
		//if thumbsup is selected thunmbsdown is unselected if thumbsdown is selected thumbsup is unselected
		searchDetailsAllDataClasses.thumbsUp.isPresent().then(function (result) {
			if (result) {
				expect(searchDetailsAllDataClasses.thumbsUp.isPresent()).toBe(true);
				expect(searchDetailsAllDataClasses.thumbsDownselected.isPresent()).toBe(true);
			} else {
				expect(searchDetailsAllDataClasses.thumbsUpselected.isPresent()).toBe(true);
				expect(searchDetailsAllDataClasses.thumbsDown.isPresent()).toBe(true);
			}
		});

	});
	it('Click thumbsup icon New count of "likes" of the product with their vote should added to it', function () {
		searchDetailsAllDataClasses.thumbsUpselected.isPresent().then(function (result) {
			if (result) {
				//one vote selected for thumbs up
				expect(searchDetailsAllDataClasses.thumbsUpvote.count()).toEqual(1);
			} else {
				//click thumsup if npt selected it is selected and count would be one
				searchDetailsAllDataClasses.thumbsUp.click();
				expect(searchDetailsAllDataClasses.thumbsUpvote.count()).toEqual(1);

			}
		});

	});

	it('Click thumbsdown icon New count of "dislikes" of the product with their vote should added to it', function () {
		//thumbsdown is selected that count is one if not selected select thumbs down and count is one
		searchDetailsAllDataClasses.thumbsDownselected.isPresent().then(function (result) {
			if (result) {
				expect(searchDetailsAllDataClasses.thumbsDownvote.count()).toEqual(1);

			} else {
				searchDetailsAllDataClasses.thumbsDown.click();
				expect(searchDetailsAllDataClasses.thumbsDownvote.count()).toEqual(1);

			}
		});

	});

	it('Verify user clicks "one thumb" at a time by clicking on either thumbs up/down button', function () {
		//if thumbsups is selected thumsdown selected is zero and if thumbsdown selected click then both counts are zero this time both are not selected

		searchDetailsAllDataClasses.thumbsUpselected.isPresent().then(function (result) {
			if (result) {
				searchDetailsAllDataClasses.thumbsUpvote.getText().then(function (text) {
					console.log("Thumbsup Text:  " + text);
				});
				expect(searchDetailsAllDataClasses.thumbsDownselected.count()).toEqual(0);

			} else {
				searchDetailsAllDataClasses.thumbsDownselected.click();
				expect(searchDetailsAllDataClasses.thumbsUpselected.count()).toEqual(0);
				expect(searchDetailsAllDataClasses.thumbsDownselected.count()).toEqual(0);
				//click again thumbsup count is 1
				searchDetailsAllDataClasses.thumbsUp.click();
				expect(searchDetailsAllDataClasses.thumbsUpselected.count()).toEqual(1);
				//click again thumbsDown count is 1
				searchDetailsAllDataClasses.thumbsDown.click();
				expect(searchDetailsAllDataClasses.thumbsDownselected.count()).toEqual(1);

			}
		});

	});
});

