import {
    body,
    endpoint,
    Integer,
    pathParams,
    request,
    response,
    String,
} from "@airtasker/spot";

@endpoint({
    method: "GET",
    path: "/api/employees/",
})
class GetAllEmployees {
    @request
    request() {}

    @response({ status: 200 })
    successfulResponse(@body body: GetEmployeesResponse[]) {}

    @response({ status: 500 })
    internalServerError(@body body: String) {}
}

@endpoint({
    method: "GET",
    path: "/api/employees/:employeeId",
})
class GetSingleEmployee {
    @request
    request(
        @pathParams
        pathParams: {
            employeeId: Integer;
        }
    ) {}

    @response({ status: 200 })
    successfulResponse(@body body: GetEmployeesResponse) {}

    @response({ status: 404 })
    notFound(@body body: String) {}

    @response({ status: 500 })
    internalServerError(@body body: String) {}
}

interface GetEmployeesResponse {
    id: Integer;
    name: String;
    salary: Integer;
}
