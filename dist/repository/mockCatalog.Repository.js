"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCatalogRepository = void 0;
class MockCatalogRepository {
    async create(data) {
        const mockData = {
            id: 123,
            ...data
        };
        return Promise.resolve(mockData);
    }
    update(data) {
        return Promise.resolve(data);
    }
    findbyIdandDelete(id) {
        if (id < 10 || id > 0) {
            return id;
        }
        else {
            return "unable to find the product";
        }
    }
    find(limit, offset) {
        const mockData = [{
                id: 123,
                name: "kiran",
                description: "amusement park",
                price: 100,
                stock: 10,
            }, { id: 124,
                name: "Sagar",
                description: "amusement park Sagar",
                price: 100,
                stock: 10, },
            { id: 125,
                name: "kiran",
                description: "amusement park Mitke",
                price: 100,
                stock: 10, }];
        return Promise.resolve(mockData);
    }
    findbyID(id, limit, offset) {
        const mockdata = {
            id: id,
            name: "kiran",
            description: "amusement park",
            price: 100,
            stock: 10,
        };
        return Promise.resolve(mockdata);
    }
}
exports.MockCatalogRepository = MockCatalogRepository;
