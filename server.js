// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Food Server!');
});

app.get('/api/swiggy/getData', async (req, res) => {
  try {
    const {lat, lng} = req.query;

    // const swiggyApiResponse = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.585445&lng=73.712479&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', {
    const swiggyApiResponse = await axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Dnt': '1',
        'Pragma': 'no-cache',
        'Referer': 'https://www.swiggy.com/',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // Add any additional headers if necessary
      },
    });
    const swiggyApiData = swiggyApiResponse.data;
    res.json(swiggyApiData);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/api/swiggy/update', async (req, res) => {
  try {
    const payload = req.body;
    // const payload = {
    //   lat: 26.8289443,
    //   lng: 75.8056178,
    //   nextOffset: "COVCELQ4KICAltS6qvXEVzCnEzgE",
    //   page_type: "DESKTOP_WEB_LISTING",
    //   seoParams: {
    //     seoUrl: "https://www.swiggy.com/",
    //     pageType: "FOOD_HOMEPAGE",
    //     apiName: "FoodHomePage"
    //   },
    //   widgetOffset: {
    //     NewListingView_Topical_Fullbleed: "",
    //     NewListingView_category_bar_chicletranking_TwoRows: "",
    //     // Add other properties as needed
    //   },
    //   _csrf: "RtB0TQWxn2YI-jJGHr9w2jYSzM4QjFO4dNUnco2w",
    // };

    const swiggyApiResponse = await axios.post('https://www.swiggy.com/dapi/restaurants/list/update', payload, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Length': JSON.stringify(payload).length,
        'Content-Type': 'application/json',
        'Cookie': '__SW=Zw_2tvzq8-R6n9JwtSucd1-_OQV1JH47; _device_id=baffdb48-7ab0-a0f6-38bb-2a8a3f33894e; WZRK_G=2b1894ca0f99451495fa76eeb55eaeb6; fontsLoaded=1; _gcl_au=1.1.1234349256.1701867256; _swuid=baffdb48-7ab0-a0f6-38bb-2a8a3f33894e; _ga_X3K3CELKLV=GS1.1.1702196141.1.1.1702196189.0.0.0; _ga_4BQKMMC7Y9=GS1.2.1702481601.13.1.1702483174.60.0.0; userLocation={%22address%22:%22Jaipur%20International%20Airport%20(JAI)%2C%20Airport%20Rd%2C%20Sanganer%2C%20Jaipur%2C%20Rajasthan%20302029%2C%20India%22%2C%22area%22:%22%22%2C%22deliveryLocation%22:%22Sanganer%22%2C%22lat%22:26.8289443%2C%22lng%22:75.8056178}; _gid=GA1.2.1830045443.1702795638; _guest_tid=1beaaff0-61f3-4b14-af92-1ff4966aa413; _sid=b2k7e6bb-a8c3-4956-8582-754b17fe9205; _ga_34JYJ0BCRN=GS1.1.1702826652.47.1.1702826663.0.0.0; _ga=GA1.1.1063001560.1693220594',
        'Dnt': '1',
        'Origin': 'https://www.swiggy.com',
        'Pragma': 'no-cache',
        'Referer': 'https://www.swiggy.com/',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
    });

    const swiggyApiData = swiggyApiResponse.data;
    res.json(swiggyApiData);
  } catch (error) {
    console.error('Error updating data on Swiggy:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/swiggy/getMenu', async (req, res) => {
  try {
    const {restaurantId, lat, lng} = req.query;

    const menuApiResponse = await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        // Add other headers as needed from your browser request
        'Cookie': '__SW=Zw_2tvzq8-R6n9JwtSucd1-_OQV1JH47; _device_id=baffdb48-7ab0-a0f6-38bb-2a8a3f33894e; WZRK_G=2b1894ca0f99451495fa76eeb55eaeb6; fontsLoaded=1; _gcl_au=1.1.1234349256.1701867256; _swuid=baffdb48-7ab0-a0f6-38bb-2a8a3f33894e; _ga_X3K3CELKLV=GS1.1.1702196141.1.1.1702196189.0.0.0; userLocation={%22address%22:%22Jaipur%20International%20Airport%20(JAI)%2C%20Airport%20Rd%2C%20Sanganer%2C%20Jaipur%2C%20Rajasthan%20302029%2C%20India%22%2C%22area%22:%22%22%2C%22deliveryLocation%22:%22Sanganer%22%2C%22lat%22:26.8289443%2C%22lng%22:75.8056178}; _gid=GA1.2.1830045443.1702795638; _ga_4BQKMMC7Y9=GS1.2.1702908697.14.0.1702908697.60.0.0; _guest_tid=296b4c34-7ec8-42c4-92b9-9a044d7d093f; _sid=b390dcb5-c7a3-43fe-82ce-5a6ae6fe258d; _gat_0=1; _ga_34JYJ0BCRN=GS1.1.1702914078.50.1.1702914086.0.0.0; _ga=GA1.2.1063001560.1693220594; _gat_UA-53591212-4=1',
        'Dnt': '1',
        'Pragma': 'no-cache',
        'Referer': 'https://www.swiggy.com/restaurants/sethi-tikka-kabab-curry-malviya-nagar-jaipur-46458',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const menuData = menuApiResponse.data;
    res.json(menuData);
  } catch (error) {
    console.error('Error fetching menu data from Swiggy:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/swiggy/getRecipesData', async (req, res) => {
  try {
    const query = req.query;
    console.log(query)
    // return "";
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8289443&lng=75.8056178&collection=${query?.collection_id}&tags=${query?.tags}&sortBy=&filters=&type=${query?.type}&offset=0&page_type=null`
    const swiggyApiResponse = await axios.get(url, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Dnt': '1',
        'Pragma': 'no-cache',
        'Referer': 'https://www.swiggy.com/',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // Add any additional headers if necessary
      },
    });
    const swiggyApiData = swiggyApiResponse.data;
    res.json(swiggyApiData);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

