// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
    
    // Clear the input field if it has text in it
    $("#brgr").on("click", function (e) {
        $("#brgr")
        .removeClass("border border-danger text-danger")
        .addClass("border border-dark text-dark")
        .val("");
    });
    
    // PUT request
    $(".devour-it").on("click", function (e) {
        let id = $(this).data("id");
        let devoured = $(this).data("devoured");

        console.log(id);
        console.log(devoured);

        let devouredState = {
            devoured: devoured
        };

        // Send a PUT request via ajax 
        // To change burger status from devoured 
        // To waiting to be devoured and back
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            () => {
                console.log("Changed burger status to", devoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    // Grabbing form values to create a burger 
    // Then send a POST request
    $(".create-burger").on("submit", function (e) {
        // Prevent default
        e.preventDefault();

        let newBurger = {
            burger_names: $("#brgr").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        if(!newBurger.burger_names) {
            $("#brgr")
            .slideUp(300)
            .delay(500)
            .fadeIn(400)
            .removeClass("border border-dark text-dark")
            .addClass("border border-danger text-danger")
            .val("No invisible burgers");
            return;
        } else if($("#brgr").val() === "No invisible burgers") {
            $("#brgr")
            .removeClass("border border-dark text-dark")
            .addClass("border border-dark text-dark")
            .val("");
            // location.reload();
            return;
        } else {
            // Sed the POST request
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                () => {
                    console.log("Created new BJJ burger");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }
        
    });

    // DELETE requst to delete a burger
    $(".burger-obliviate").on("click", function (e) {
        let id = $(this).data("id");
        console.log("This id is");
        console.log(id);

        // Send the DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            () => {
                console.log("You tapped that burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});