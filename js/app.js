const app = new Vue({
    el: '#app',
    data: {
        id: 1,
        events: [],
        type: [
            'house-work',
            'relax',
            'learning',
            'social'
        ],
        newTitle: '',
        newDate: 1,
        newType: 'house-work',
    },
    mounted() {
        if (localStorage.getItem('events') !== 'null') {
            this.events = JSON.parse(localStorage.getItem('events'));
        }
    },
    computed: {
        
    },
    methods: {
        classObject: function (type) {
            let obj = {};
            obj[type] = true;
            return obj;
        },
        getDays(day) {
            switch (day) {
                case 1:
                    return 'Mon';
                case 2:
                    return 'Tue';
                case 3:
                    return 'Wed';
                case 4:
                    return 'Thur';
                case 5:
                    return 'Fri';
                case 6:
                    return 'Sat';
                case 7:
                    return 'Sun';
            }
        },
        fitWordBox: function (title) {
            return title.length > 15 ? title.slice(0, 15) + '...' : title
        },
        pushToEvents() {
            const newEvent = {
                id: this.id,
                title: this.newTitle,
                type: this.newType,
                day: this.newDate
            };
            ++this.id;
            this.events.push(newEvent);
            this.newTitle = '';
            this.newDate = 1;
            this.newType = 'house-work';
        },
        deleteEvent(id) {
            this.events = this.events.filter(e => e.id !== id);
        },
        editEvent(id) {
            const event = this.events.filter(e => e.id === id)[0];
            this.newTitle = event.title;
            this.newDate = event.day;
            this.newType = event.type;
            this.events = this.events.filter(e => e.id !== id);
        }
    },
    watch: {
        events: {
            handler() {
                localStorage.setItem('events', JSON.stringify(this.events));
            }
        }
    },
});