// <!--Centricity Checkout Customization-->
// {{ 'centricity/code/fetch_disclaimer_text.js' | asset_url | script_tag }}

// fetch data, from shipping table document converted from xcel to json
async function fetchData() {
    try {
        const response = await fetch('https://centricity-shipping-disclaimer.netlify.app/shipping-disclaimer-text.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data
    
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// call fetch
async function getData() {
    const shipping_data = await fetchData();
    // if data returned 
    if (shipping_data) {
        // for each store 
        shipping_data.forEach(store => {
            // for stores where we want to show custom text
            if (store["Show Custom Renderd Shipping Text"] === true){
                // if current url includes brightstores subdomain 
                if (location.href.includes(`${store["Subdomain"]}.mybrightsites.com`)){
                  		// if 2018 theme shipping submit button
                  		if (document.querySelector(".content-item.shipping input[type='submit']")){
                          // insert custom text before submit button
                          document.querySelector(".content-item.shipping input[type='submit']").insertAdjacentHTML("beforebegin", `<p>${store["Custom Shipping Rendered Text"]}</p>`)
                        }
                  		// else 2022 theme
                  		else {
                          console.log("2022")
                          // insert custom text before submit button
                          document.querySelector("input[type='submit']").insertAdjacentHTML("beforebegin", `<p>${store["Custom Shipping Rendered Text"]}</p>`)
                        }
                }
                // if there is a custom domain
                if(store["Custom Domain"]){
                    // if current url includes custom domain
                    if (location.href.includes(`${store["Custom Domain"]}`)){                      	
                      	// if 2018 theme shipping submit button
                  		if (document.querySelector(".content-item.shipping input[type='submit']")){
                          // insert custom text before submit button
                          document.querySelector(".content-item.shipping input[type='submit']").insertAdjacentHTML("beforebegin", `<p>${store["Custom Shipping Rendered Text"]}</p>`)
                        }
                  		// else 2022 theme
                  		else {
                          // insert custom text before submit button
                          document.querySelector("input[type='submit']").insertAdjacentHTML("beforebegin", `<p>${store["Custom Shipping Rendered Text"]}</p>`)
                        }
        
                    }
                }

            }
        });
    }
}

// run function
getData();

