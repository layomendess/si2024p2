// Código para carregar eventos do Google Calendar (mantido)
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'alexbarrosjjjjjj@gmail.com',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        var eventsList = document.getElementById('calendar-events');

        if (events.length > 0) {
            eventsList.innerHTML = '<ul class="list-group">';
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime || event.start.date;
                var eventItem = `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${event.summary}</span>
                        <span class="badge bg-primary rounded-pill">${new Date(when).toLocaleString()}</span>
                    </li>
                `;
                eventsList.innerHTML += eventItem;
            }
            eventsList.innerHTML += '</ul>';
        } else {
            eventsList.innerHTML = '<p>Nenhum evento futuro encontrado.</p>';
        }
    }, function (error) {
        console.error('Erro ao carregar eventos do Google Calendar:', error);
        document.getElementById('calendar-events').innerHTML = `<p>Erro ao carregar eventos: ${error.result.error.message}</p>`;
    });
}