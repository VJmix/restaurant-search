import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

const credentials = [
    {
        "username": "vijay",
        "password": "1234"
    },
    {
        "username": "logan",
        "password": "logang"
    },
    {
        "username": "jake",
        "password": "team10"
    },
    {
        "username": "sam",
        "password": "pepper"
    }
];

const friendsList = [
    {
        "user": "vijay",
        "friends": ["logan", "sam"]
    },
    {
        "user": "jake",
        "friends": ["logan"]
    },
    {
        "user": "logan",
        "friends": ["jake", "vijay"]
    },
    {
        "user": "sam",
        "friends": ["vijay"]
    }
];

const orders = [
    {
        "user": "vijay",
        "cuisinesAndRestaurants" : [
            {
                "cuisineName": "Tacos",
                "restaurantName": "Juan's mexican delicacies"
            }
        ]
    },
    {
        "user": "logan",
        "cuisinesAndRestaurants": [
            {
                "cuisineName": "Tortillas",
                "restaurantName": "Alvano restaurant"
            }
        ]
    },
    {
        "user": "jake",
        "cuisinesAndRestaurants": [
            {
                "cuisineName": "Tequila",
                "restaurantName": "Amanecer's Te Amo restaurant"
            },
            {
                "cuisineName": "Burritos",
                "restaurantName": "Escobar's palace"
            }
        ]
    },
    {
        "user": "sam",
        "cuisinesAndRestaurants": [
        ]
    }
];

const cuisinesAndRestaurants = [
        {
            "cuisineName": "Tacos",
            "origin": "mexican",
            "uniqueId": "101",
            "price": "$3",
            "distance": "0.5 KM",
            "imageCode": "cCLGHy",
            "restaurantName": "Juan's mexican delicacies"
        },
        {
            "cuisineName": "Burritos",
            "origin": "mexican",
            "uniqueId": "102",
            "price": "$5",
            "distance": "0.8 KM",
            "imageCode": "fxTgjd",
            "restaurantName": "Escobar's palace"
        },
        {
            "cuisineName": "Tortillas",
            "origin": "mexican",
            "uniqueId": "103",
            "price": "$8",
            "distance": "2 KM",
            "imageCode": "kMmqcy",
            "restaurantName": "Alvano restaurant"
        },
        {
            "cuisineName": "Chimmichangas",
            "origin": "mexican",
            "uniqueId": "104",
            "price": "$10",
            "distance": "1.2 KM",
            "imageCode": "fPhkAJ",
            "restaurantName": "Lele's kitchen"
        },
        {
            "cuisineName": "Guacamole",
            "origin": "mexican",
            "uniqueId": "105",
            "price": "$15",
            "distance": "3 KM",
            "imageCode": "eUvixy",
            "restaurantName": "Trompeta's pared"
        },
        {
            "cuisineName": "Tequila",
            "origin": "mexican",
            "uniqueId": "106",
            "price": "$20",
            "distance": "0.4 KM",
            "imageCode": "edzAcy",
            "restaurantName": "Amanecer's Te Amo restaurant"
        }
];

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent{
    isLoggedIn: boolean = false;
    stillLoggingIn: boolean = false;
    username: string = '';
    password: string = '';

    show: boolean = false;
    searchText: string = 'Search';
    iconName: string = 'search';
    showList: boolean = false;
    cuisineOrRestarauntList: any = [];
    cuisinesOrRestaurantsAvailable: boolean = false;
    cuisineOrRestaraunt: string = '';

    cuisineName: string = '';
    restaurantName: string = '';
    origin: string = '';
    distance: string = '';
    price: string = '';
    imageCode: string = '';
    imageAddress: string = '';
    myFriendsOrders: Array<any> = [];


    backgroundImages: Array<any> = [];
    bgImagesId: Array<any> = ["cwtgjd/bg1", "m977Pd/bg2", "c233xy/bg3"];
    totalNumberOfImages: number = 3;

    friendsList: Array<any> = [];


    constructor(public snackBar: MatSnackBar) {
        
    }
    ngOnInit() {
         this.prepareBackgroundImages();
    }

    prepareBackgroundImages() {
        this.backgroundImages = [];
        for(let imageNumber = 0; imageNumber < this.totalNumberOfImages; imageNumber++) {
            let image = 'https://image.ibb.co/' + this.bgImagesId[imageNumber] + '.jpg';
            this.backgroundImages.push(image);
        }
    }

     searchClicked() {
     this.show = !this.show;
     if(this.show === false) {
            this.searchText = 'Search';
            this.iconName = 'search';
            this.cuisinesOrRestaurantsAvailable = false;
            this.showList = false;
            this.cuisineOrRestarauntList = [];

        }
        else {
            this.searchText = '';
            this.iconName = 'close';
        }
    }

    searchCuisine(searchBarText) {
        this.cuisineOrRestarauntList = [];
        this.cuisineOrRestaraunt = searchBarText.value.toLowerCase().trim();
        cuisinesAndRestaurants.forEach(availableCuisineAndRestaurant => {
            if (availableCuisineAndRestaurant.cuisineName === this.cuisineOrRestaraunt || availableCuisineAndRestaurant.restaurantName === this.cuisineOrRestaraunt || availableCuisineAndRestaurant.origin === this.cuisineOrRestaraunt) {
                this.processCuisineOrRestarauntList(availableCuisineAndRestaurant);
            }
        });

        this.showList = true;
        if (this.cuisineOrRestarauntList.length > 0) {
            this.cuisinesOrRestaurantsAvailable = true;
        }
        else {
            this.cuisinesOrRestaurantsAvailable = false;
        }

        searchBarText.value="";
    }

    processCuisineOrRestarauntList(availableCuisineAndRestaurant) {
        this.cuisineName = availableCuisineAndRestaurant.cuisineName;
        this.restaurantName = availableCuisineAndRestaurant.restaurantName;
        this.origin = availableCuisineAndRestaurant.origin;
        this.origin = this.origin[0].toUpperCase() + this.origin.substr(1, this.origin.length);
        this.distance = availableCuisineAndRestaurant.distance;
        this.price = availableCuisineAndRestaurant.price;
        this.imageCode = availableCuisineAndRestaurant.imageCode;
        this.imageAddress = "https://image.ibb.co/" + this.imageCode + "/" + this.cuisineName + ".jpg";
        this.myFriendsOrders = this.checkAndReturnOrders(this.restaurantName);

        let totalDataSet = {
            cuisine: this.cuisineName,
            restaurant: this.restaurantName,
            origin: this.origin,
            distance: this.distance,
            price: this.price,
            image: this.imageAddress,
            friendsOrders: this.myFriendsOrders
        }
        this.cuisineOrRestarauntList.push(totalDataSet);
    }

    checkAndReturnOrders(receivedRestaurantName) {
        let myFriendsTotalOrder = [];
        this.friendsList.forEach(friend => {
            let friendOrder: any;
            orders.forEach(order => {
                if(order.user === friend) {
                    friendOrder = order.cuisinesAndRestaurants;
                    if (friendOrder.length > 0) {
                        friendOrder.forEach(cuisineAndRestaurant => {
                            if (cuisineAndRestaurant.restaurantName === receivedRestaurantName) {
                                myFriendsTotalOrder.push({ "friend": friend, "cuisineName": cuisineAndRestaurant.cuisineName });
                            }
                        });
                    }
                }
            });

        });
        return myFriendsTotalOrder;
    }

    getFriends() {
        friendsList.forEach(user => {
            if(user.user === this.username) {
                this.friendsList = user.friends;
            }
        });
    }

    loginForm() {
        this.stillLoggingIn = !this.stillLoggingIn;
    }

    login(inputUsername, inputPassword) {
        this.isLoggedIn = false;
        credentials.forEach(authToken => {
            if((authToken.username == inputUsername && authToken.password == inputPassword) && this.isLoggedIn === false) {
                this.username = inputUsername;
                this.password = inputPassword;
                this.isLoggedIn = true;
                this.getFriends();
            }
        });
        if(this.isLoggedIn === false) {
            this.warning("Wrong credentials", "Try again!");
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.stillLoggingIn = false;
        this.showList = false;
        this.username = '';
        this.password = '';
    }

    notYetImplemented() {
        this.warning("This feature is not yet implemented!", "OK");
    }

    warning(message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
 }
