from py_eureka_client import eureka_client

async def register_with_eureka(app_name, port):
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/eureka/",
        app_name=app_name.upper(),
        instance_port=port,
        instance_host="localhost",
        instance_ip="127.0.0.1",
        health_check_url=f"http://localhost:{port}/transaction/health",
        status_page_url=f"http://localhost:{port}/transaction/health"
    )
