// Get csrf_token cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
// const csrftoken = getCookie('csrftoken');
// end the csrf_token function

$("document").ready(function(){
    console.log("hello i am working fine")
    $("#weatherForm").submit(function(e){
        e.preventDefault()
        console.log($("#city").val())
        $(".output").html("")
        $.ajax({
            type: "POST",
            url:"",
            data:{
                "city":$("#city").val()
            },
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            success:function(resp){
                console.log(resp.data)
                document.querySelector("#weatherForm").reset()
                $(".output").html(`<div class="card mb-3 shadow">
                <div class="text-center"><img class="img-fluid" src="http://openweathermap.org/img/w/${resp.data.icon}.png" alt="Card image cap"width="150", height="150"></div>
                <div class="card-body">
                  <p>City: <strong class="card-title">${resp.data.city}</strong> | Country: <strong class="card-title">${resp.data.country}</strong>
                  <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card text-white bg-danger shadow-sm mb-3" style="max-width: 18rem;">
                              <div class="card-header text-center"><b>More Information</b></div>
                              <div class="card-body">
                                <ul>
                                    <li>Coordinate: <strong>Lat: ${resp.data.cor.lat} Long: ${resp.data.cor.lon}</strong>
                                    <li>Temperature: <strong>${resp.data.temperature} C</strong>
                                    <li>Description of weather: <strong>${resp.data.description}</strong>
                                </ul>
                              </div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>`)
            },
            error:function(error){
                 $(".output").html(`
                <div class="alert alert-danger" role="alert text-center">
                  Make sure the city name is spelt corectly. !!
                </div>
              `)
                
            }
            
    })
    })
})
