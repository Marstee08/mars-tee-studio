function goToProjects() {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
}

<script>

// Automatically select service

const params = new URLSearchParams(window.location.search);

const selectedService = params.get("service");

if(selectedService){
    document.getElementById("service").value = selectedService;
}

document.getElementById("quoteForm").addEventListener("submit", function(event){

    event.preventDefault();

    // the rest of your code stays exactly the same

});

</script>