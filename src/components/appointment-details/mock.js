// const mockData = {
//     apptVitalId: 6,
//     apptId: 1,
//     clientId: 2,
//     "Weight": '23lbs (Estimated)',
//     "Weight Unit": 1,
//     "Weight Estimated?": 1,
//     "Temperature":'99.9°F',
//     "Temperature Unit": 1,
//     "Temperature Route": 'Rectal',
//     "Heart Rate": '98BPM',
//     "Respiratory Rate": '####',
//     "Pulse Quality": 'Good',
//     "CRT": '98BPM',
//     "Mucous Membrane": "####",
//     "Hydration": 'Good',
//     "Systolic Blood Pressure": "####",
//     "Diastolic Blood Pressure": "####",
//     "Body Condition Score": "####",
//     "Pain Score": "####",
//     "FAS Score": "####",
//     healthAttrList: [
//         {
//             healthAttrName: 'Subjective',
//             "healthAttrId": 1,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             healthAttrStatusId: 'normal'
//         },
//         {
//             healthAttrName: "['Assessment']",
//             "healthAttrId": 2,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: "['Plan']",
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'General Appearance',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'Oral Health',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'Eyes',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'Integumentary',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'Musculoskeletal',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 'Normal'
//         },
//         {
//             healthAttrName: 'Gastrointestinal',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 1
//         },
//         {
//             healthAttrName: 'Cardiac',
//             "healthAttrId": 3,
//             healthAttrValue: "Proin sed massa at orci bibendum dictum in ut augue. Nullam neque nisl, semper et sodales eget, porttitor ultricies purus. Aenean ut pellentesque urna. Mauris turpis sem, porttitor non sapien nec, auctor scelerisque massa. Vestibulum imperdiet tortor sapien, in convallis odio rhoncus et. Nulla eleifend, mauris nec suscipit scelerisque, felis mauris accumsan mauris.",
//             "healthAttrStatusId": 1
//         }
//     ]
// }

// export default mockData;
