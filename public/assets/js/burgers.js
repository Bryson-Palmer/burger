// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
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