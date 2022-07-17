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
    method: "DELETE",
    path: "/api/employees/:employeeId",
})
class DeleteEmployee {
    @request
    request(
        @pathParams
        pathParams: {
            employeeId: Integer;
        }
    ) {}

    @response({ status: 200 })
    successfulResponse(@body body: String) {}

    @response({ status: 404 })
    notFound(@body body: String) {}

    @response({ status: 500 })
    internalServerError(@body body: String) {}
}
