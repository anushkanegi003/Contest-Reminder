document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        // Initialize the FullCalendar
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [], // Empty array to start with
            eventClick: function(info) {
                alert('Event: ' + info.event.title + '\n' +
                      'Date: ' + info.event.start.toDateString() + '\n' +
                      'Details: ' + info.event.extendedProps.description);
            }
        });

        // Render the calendar
        calendar.render();

        // Fetch contest data
        fetch('your-contest-fetch-url-or-function')
            .then(response => response.json())
            .then(data => {
                // Assuming data is an array of contest objects
                const events = data.map(contest => ({
                    title: contest.name,
                    start: contest.start_time, // Ensure this is in a proper format like '2024-09-01'
                    description: contest.description || 'No details available',
                    url: contest.url // If you want to link to the contest
                }));

                // Add events to the calendar
                calendar.addEventSource(events);
            })
            .catch(error => console.error('Error fetching contests:', error));
    } else {
        console.error('Calendar element not found!');
    }
});
