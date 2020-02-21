const apiKey = 'fVS8yGIl5pNn73yfkIbNXh5lzQWIk5MwblBSr9jKpmNJBUV8f4FrWXGDROPiwO4K_WM3qWoeWbVwizsH9atrrQu9W-hyIeFK8qe8CAuaUR7c1-6UBy89eN1ZW7edXXYx';


const Yelp ={
    search(term, location, sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {
            headers:{
                Authorization: `Bearer ${apiKey}` 
            }
        }
        ).then(response=>{
            return response.json();
        }).then(jsonResponse=>{
            if(jsonResponse.businesses){
               return jsonResponse.businesses.map(business=>{
                   return{
                      id: business.id,
                      imageSrc: business.image_url,
                      name: business.name,
                      address: business.location.address1,
                      city: business.location.city,
                      state: business.state,
                      zip_code: business.zipCode,
                      category: business.categories[0].title,
                      rating: business.rating,
                      reviewCount: business.review_count

                   }
               });
            }
        });

    }
}

export default Yelp;