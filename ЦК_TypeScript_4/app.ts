export namespace Transport {
    export enum DocumentType {
        Passport,
        DriverLicense,
        IDCard
    }

    export interface Owner {
        lastName: string;
        firstName: string;
        middleName: string;
        birthDate: Date;
        documentType: DocumentType;
        documentSeries: string;
        documentNumber: string;
        printInfo(): void;
    }
    export interface Vehicle {
        brand: string;
        model: string;
        year: number;
        vin: string;
        registrationNumber: string;
        owner: Owner;
        printVehicleInfo(): void;
    }

    export enum CarBodyType {
        Sedan,
        SUV,
        Hatchback,
        Coupe
    }

    export enum CarClass {
        Economy,
        Business,
        Premium
    }

    export interface Car extends Vehicle {
        bodyType: CarBodyType;
        carClass: CarClass;
    }
    export interface Motorbike extends Vehicle {
        frameType: string;
        isForSport: boolean;
    }

    export class Person implements Owner {
        constructor(
            public lastName: string,
            public firstName: string,
            public middleName: string,
            public birthDate: Date,
            public documentType: DocumentType,
            public documentSeries: string,
            public documentNumber: string
        ) { }

        printInfo(): void {
            console.log(`Owner: ${this.lastName} ${this.firstName} ${this.middleName},
            birthDate: ${this.birthDate.toDateString()},
            document: ${DocumentType[this.documentType]} ${this.documentSeries} ${this.documentNumber}`);
        }
    }
    export class Transport implements Vehicle {
        constructor(
            public brand: string,
            public model: string,
            public year: number,
            public vin: string,
            public registrationNumber: string,
            public owner: Owner
        ) { }

        printVehicleInfo(): void {
            console.log(`Transport: ${this.brand} ${this.model}, ${this.year},
            VIN: ${this.vin},
            registrationNumber: ${this.registrationNumber}`);
        }
    }
    export class Automobile extends Transport implements Car {
        constructor(
            brand: string,
            model: string,
            year: number,
            vin: string,
            registrationNumber: string,
            owner: Owner,
            public bodyType: CarBodyType,
            public carClass: CarClass
        ) {
            super(brand, model, year, vin, registrationNumber, owner);
        }

        printVehicleInfo(): void {
            super.printVehicleInfo();
            console.log(`Type: ${CarBodyType[this.bodyType]}, Class: ${CarClass[this.carClass]}`);
        }
    }
    export class Motorcycle extends Transport implements Motorbike {
        constructor(
            brand: string,
            model: string,
            year: number,
            vin: string,
            registrationNumber: string,
            owner: Owner,
            public frameType: string,
            public isForSport: boolean
        ) {
            super(brand, model, year, vin, registrationNumber, owner);
        }

        printVehicleInfo(): void {
            super.printVehicleInfo();
            console.log(`Frame Type: ${this.frameType},
            Sprort?: ${this.isForSport ? "Yes" : "No"}`);
        }
    }

    export interface VehicleStorage<T extends Vehicle> {
        creationDate: Date;
        vehicles: T[];
        getAllVehicles(): T[];
    }

    export class Storage<T extends Vehicle> implements VehicleStorage<T> {
        constructor(
            public creationDate: Date,
            public vehicles: T[] = []
        ) { }

        getAllVehicles(): T[] {
            return this.vehicles;
        }
    }
}