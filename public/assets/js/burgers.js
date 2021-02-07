// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
    $(".devour-it").on("click", (e) => {
        let id = $(this).data("id");
        let devoured = $(this).data("devoured");

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
                consolelog("Changed burger status to", devoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    // Grabbing form values to create a burger 
    // Then send a POST request
    $(".create-burger").on("submit", (e) => {
        // Prevent default
        e.preventDefault();

        let newBurger = {
            burgers_name: $("#brgr").val().trim(),
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
    $("burger-obliviate").on("click", (e) => {
        let id = $(this).data("id");

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